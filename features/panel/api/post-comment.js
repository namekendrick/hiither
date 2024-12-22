"use server";

import prisma from "@/lib/prisma";
import { CommentSchema } from "@/features/panel/schemas";
import { currentUser } from "@/lib/auth";
import { ratelimit } from "@/lib/redis";

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

    await prisma.comment.create({
      data: {
        text,
        authorId: user.id,
        panelId,
        replyToId,
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
