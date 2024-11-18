"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const deleteComment = async (values) => {
  try {
    const { commentId } = values;

    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (user.id !== comment.authorId)
      return { status: 401, message: "Unauthorized!" };

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return { status: 200, message: "Comment deleted!" };
  } catch (error) {
    console.log("[COMMENT_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
