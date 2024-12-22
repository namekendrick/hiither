"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { ratelimit } from "@/lib/redis";

export const panelVote = async (values) => {
  try {
    const { type, panelId } = values;

    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const { success } = await ratelimit.limit(user.id);

    if (!success) return { status: 429, message: "Too many requests!" };

    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        panelId,
      },
    });

    if (existingVote) {
      if (existingVote.type === type) {
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });

        return { status: 200, message: "Vote deleted!" };
      } else {
        await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: { type },
        });

        return { status: 200, message: "Vote updated!" };
      }
    }

    await prisma.vote.create({
      data: {
        userId: user.id,
        panelId,
        type,
      },
    });

    return { status: 200, message: "Vote created!" };
  } catch (error) {
    console.log("[COMMENT_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
