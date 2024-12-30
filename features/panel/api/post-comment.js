"use server";

import prisma from "@/lib/prisma";
import { getCommunityAccess } from "@/db/auth/join";
import { CommentSchema } from "@/features/panel/schemas";
import { currentUser } from "@/lib/auth";
import { openai } from "@/lib/openai";
import { ratelimit } from "@/lib/redis";
import { isSpam } from "@/lib/spam";

export const postComment = async (values) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const { panelId, replyToId } = values;

    const validatedFields = CommentSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { text } = validatedFields.data;

    const { success } = await ratelimit.limit(user.id);
    if (!success) return { status: 429, message: "Too many requests!" };

    const access = await getCommunityAccess(panelId);
    if (access === "BANNED") return { status: 401, message: "Unauthorized!" };

    let status = "PUBLISHED";

    if (access !== "TRUSTED" && access !== "MODERATOR") {
      const spamAnalysis = isSpam(text);

      if (spamAnalysis.isSpam) {
        status = "SPAM";
      } else {
        var autoModeration;

        const moderation = await openai.moderations.create({
          model: "omni-moderation-latest",
          input: text,
        });

        if (moderation.results[0].flagged || spamAnalysis.isSupicious) {
          status = "PENDING";
        }

        autoModeration = moderation.results[0];
      }

      await prisma.comment.create({
        data: {
          text,
          authorId: user.id,
          panelId,
          replyToId,
          status,
          metadata: {
            spamScore: spamAnalysis.score,
            spamIndicators: spamAnalysis.indicators,
            autoModeration,
          },
        },
      });

      return { status: 200 };
    }

    await prisma.comment.create({
      data: {
        text,
        authorId: user.id,
        panelId,
        replyToId,
        status,
      },
    });

    return {
      status: 200,
      message: "Comment posted!",
    };
  } catch (error) {
    console.log("[COMMENT_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
