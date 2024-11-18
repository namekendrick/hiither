"use server";

import prisma from "@/lib/prisma";
import {
  checkPanelLimit,
  updatePanelLimit,
} from "@/features/auth/api/api-limit";
import { checkSubscription } from "@/features/auth/api/subscription";
import { currentUser } from "@/lib/auth";

export const publishPanel = async (id) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const freeTrial = await checkPanelLimit();
    const isSubscribed = await checkSubscription();

    if (!freeTrial && !isSubscribed) {
      return { status: 403, message: "Please upgrade to publish!" };
    }

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

    const panel = await prisma.panel.update({
      where: { id },
      data: {
        isPublished: true,
      },
    });

    await updatePanelLimit();

    return {
      status: 200,
      message: "Panel published!",
      domainId: data.permission.domainId,
      panel,
    };
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
