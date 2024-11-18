"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const autosave = async ({ id, json }) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const panel = await prisma.panel.findFirst({
      where: { id },
      include: {
        permission: true,
      },
    });

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: panel.permission.domainId,
      },
    });

    if (permission) {
      await prisma.panel.update({
        where: { id },
        data: {
          content: JSON.parse(json),
        },
      });

      return { status: 200, message: "Saved!" };
    }

    return { status: 401, message: "Unauthorized!" };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
