"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const postComment = async (values) => {
  try {
    const { text, panelId, replyToId } = values;

    const user = await currentUser();

    if (!user) return { status: 401, message: "Unauthorized!" };

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
