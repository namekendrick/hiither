"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const commentVote = async (values) => {
  try {
    const { type, commentId } = values;

    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const existingVote = await prisma.commentVote.findFirst({
      where: {
        userId: user.id,
        commentId,
      },
    });

    if (existingVote) {
      if (existingVote.type === type) {
        await prisma.commentVote.delete({
          where: {
            id: existingVote.id,
          },
        });

        return { status: 200, message: "Vote deleted!" };
      } else {
        await prisma.commentVote.update({
          where: {
            id: existingVote.id,
          },
          data: { type },
        });

        return { status: 200, message: "Vote updated!" };
      }
    }

    await prisma.commentVote.create({
      data: {
        userId: user.id,
        commentId,
        type,
      },
    });

    return { status: 200, message: "Vote created!" };
  } catch (error) {
    console.log("[COMMENT_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
