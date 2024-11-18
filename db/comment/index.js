"use server";

import prisma from "@/lib/prisma";

export const getCommentsByPanelId = async (panelId) => {
  try {
    if (!panelId) return { status: 404, message: "Panel not found!" };

    const comments = await prisma.comment.findMany({
      where: {
        panelId,
        replyToId: null,
      },
      include: {
        author: true,
        votes: true,
        replies: {
          include: {
            author: true,
            votes: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (comments) return comments;
  } catch (error) {
    console.log("[COMMENT_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
