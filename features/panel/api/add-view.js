"use server";

import { headers } from "next/headers";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { ratelimit } from "@/lib/redis";

export const addView = async (panelId) => {
  try {
    const user = await currentUser();

    const panel = await prisma.panel.findUnique({
      where: { id: panelId },
    });

    if (!panel) return { status: 404, message: "No panel found!" };

    const ip = headers().get("x-forwarded-for") ?? "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return { status: 429, message: "Too many requests!" };
    }

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
