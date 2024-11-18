"use server";

import prisma from "@/lib/prisma";
import { updatePanelLimit } from "@/features/auth/api/api-limit";
import { currentUser } from "@/lib/auth";

export const deletePanel = async (id) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const data = await prisma.panel.findUnique({
      where: { id },
      select: {
        permission: {
          select: {
            domainId: true,
          },
        },
      },
    });

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: data.permission.domainId,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    await prisma.panel.delete({
      where: { id },
    });

    await updatePanelLimit();

    return {
      status: 200,
      message: "Panel deleted",
    };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
