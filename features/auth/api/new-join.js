"use server";

import prisma from "@/lib/prisma";
import { getPublicDomainByPanelId } from "@/db/domain";
import { currentUser } from "@/lib/auth";

export const newJoin = async (panel) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized!" };

  const { id: domainId } = await getPublicDomainByPanelId(panel);
  if (!domainId) return { status: 404, message: "Domain not found!" };

  const existing = await prisma.join.findUnique({
    where: {
      userId_domainId: {
        userId: user.id,
        domainId: domainId,
      },
    },
  });

  if (existing) {
    return { success: "Already a member!" };
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        joins: {
          create: {
            domain: {
              connect: {
                id: domainId,
              },
            },
            source: {
              connect: {
                id: panel,
              },
            },
          },
        },
      },
      include: {
        joins: {
          include: {
            domain: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return { success: "Community joined!" };
  }
};
