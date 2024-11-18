"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const createPanel = async (values) => {
  try {
    const { domainId, title } = values;

    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    const panel = await prisma.panel.create({
      data: {
        title,
        permission: {
          connect: {
            id: permission.id,
          },
        },
      },
    });

    return {
      status: 200,
      message: "Panel created!",
      panel,
    };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
