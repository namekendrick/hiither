"use server";

import prisma from "@/lib/prisma";
import { COMMENTS_PER_PANEL } from "@/constants/pagination";

export const getCommentsByPanelId = async ({ id, pageParam }) => {
  try {
    if (!id) return { status: 404, message: "Panel ID not found!" };

    const cursor = pageParam ?? "";
    const cursorObj = cursor === "" ? undefined : { id: cursor.toString() };

    const comments = await prisma.comment.findMany({
      take: COMMENTS_PER_PANEL,
      cursor: cursorObj,
      skip: cursor === "" ? 0 : 1,
      where: {
        panelId: id,
        replyToId: null,
        AND: [
          {
            OR: [{ status: "PUBLISHED" }, { status: "PENDING" }],
          },
        ],
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

    let nextCursor =
      comments.length === COMMENTS_PER_PANEL
        ? comments[COMMENTS_PER_PANEL - 1].id
        : undefined;

    if (comments)
      return {
        comments,
        nextCursor,
      };
  } catch (error) {
    console.log("[COMMENT_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
