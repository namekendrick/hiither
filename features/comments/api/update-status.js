"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const updateStatus = async (values) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const { id, action } = values;

    const data = await prisma.comment.findUnique({
      where: { id },
      select: {
        panel: {
          select: {
            permission: {
              select: {
                domainId: true,
              },
            },
          },
        },
      },
    });

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: data.panel.permission.domainId,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    await prisma.comment.update({
      where: { id },
      data: {
        status: action === "delete" ? "DELETED" : "PUBLISHED",
      },
    });

    return {
      status: 200,
      message: action === "delete" ? "Comment deleted!" : "Comment published!",
    };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
