"use server";

import prisma from "@/lib/prisma";
import { namePanelSchema } from "@/features/panels/schemas";
import { currentUser } from "@/lib/auth";

export const renamePanel = async (values) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const validatedFields = namePanelSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { id, title } = validatedFields.data;

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

    await prisma.panel.update({
      where: { id },
      data: { title },
    });

    return {
      status: 200,
      message: "Panel renamed",
    };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
