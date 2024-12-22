"use server";

import prisma from "@/lib/prisma";
import { createPanelSchema } from "@/features/panels/schemas";
import { currentUser } from "@/lib/auth";

export const createPanel = async (values) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const validatedFields = createPanelSchema.safeParse(values);

    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { domainId, title } = validatedFields.data;

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
