"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const uploadImage = async ({ id, image }) => {
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
          images: {
            create: { url: image },
          },
        },
      });

      return { status: 200, message: "Image uploaded!" };
    }

    return { status: 401, message: "Unauthorized!" };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
