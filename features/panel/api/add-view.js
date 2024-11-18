"use server";

import { currentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const addView = async (panelId) => {
  try {
    const user = await currentUser();

    const panel = await prisma.panel.findUnique({
      where: { id: panelId },
    });

    if (!panel) return { status: 404, message: "No panel found!" };

    if (panel.isPublished) {
      if (user) {
        await prisma.view.create({
          data: {
            panel: {
              connect: {
                id: panelId,
              },
            },
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      } else {
        await prisma.view.create({
          data: {
            panel: {
              connect: {
                id: panelId,
              },
            },
          },
        });
      }
    }

    return { status: 200 };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
