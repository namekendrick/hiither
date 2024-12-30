"use server";

import prisma from "@/lib/prisma";
import { getPublicDomainByPanelId } from "@/db/domain";
import { currentUser } from "@/lib/auth";

export const getCommunityAccess = async (panelId) => {
  const user = await currentUser();

  const { id: domainId } = await getPublicDomainByPanelId(panelId);
  if (!domainId) return { status: 404, message: "Domain not found!" };

  try {
    const data = await prisma.join.findUnique({
      where: {
        userId_domainId: {
          userId: user.id,
          domainId: domainId,
        },
      },
      select: {
        access: true,
      },
    });

    if (data) return data.access;
  } catch {
    return null;
  }
};
