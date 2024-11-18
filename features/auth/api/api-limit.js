import prisma from "@/lib/prisma";
import { FREE_TRIAL_PANELS } from "@/constants/api-limits";
import { currentUser } from "@/lib/auth";

export const updatePanelLimit = async () => {
  const { id: userId } = await currentUser();

  if (!userId) return;

  const published = await prisma.panel.count({
    where: {
      permission: {
        is: { userId },
      },
      isPublished: true,
    },
  });

  const userPanelLimit = await prisma.userPanelLimit.findUnique({
    where: { userId },
  });

  if (userPanelLimit) {
    await prisma.userPanelLimit.update({
      where: { userId },
      data: { count: published },
    });
  } else {
    await prisma.userPanelLimit.create({
      data: { userId, count: published },
    });
  }
};

export const checkPanelLimit = async () => {
  const { id: userId } = await currentUser();

  if (!userId) return false;

  const userPanelLimit = await prisma.userPanelLimit.findUnique({
    where: { userId },
  });

  if (!userPanelLimit || userPanelLimit.count < FREE_TRIAL_PANELS) {
    return true;
  }

  return false;
};
