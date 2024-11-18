"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const getCurrentDomainByDomainId = async (id) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    if (!id) return { status: 401, message: "Domain id required!" };

    const domain = await prisma.domain.findUnique({
      where: { id },
    });

    domain.isMine = user.id === domain.ownerId;

    if (!domain.isMine) return null;

    return domain;
  } catch (error) {
    console.log("[DOMAIN_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getCurrentUsersDomains = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const domains = await prisma.domain.findMany({
      where: {
        ownerId: user.id,
      },
    });

    if (domains) return domains;
  } catch (error) {
    console.log("[DOMAIN_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getPublicDomainByDomainId = async (id) => {
  try {
    const domain = await prisma.domain.findUnique({
      where: { id },
    });

    const user = await currentUser();

    if (user) {
      const isMember = await prisma.join.findUnique({
        where: {
          userId_domainId: {
            userId: user.id,
            domainId: domain.id,
          },
        },
      });

      domain.isMember = !!isMember;
    }

    if (domain) return domain;
  } catch (error) {
    console.log("[DOMAIN_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getPublicDomainByPanelId = async (id) => {
  try {
    const domain = await prisma.panel.findUnique({
      where: { id },
      select: {
        permission: {
          select: {
            domain: true,
          },
        },
      },
    });

    const user = await currentUser();

    if (user) {
      const isMember = await prisma.join.findUnique({
        where: {
          userId_domainId: {
            userId: user.id,
            domainId: domain.permission.domain.id,
          },
        },
      });

      domain.permission.domain.isMember = !!isMember;
    }

    if (domain) return domain.permission.domain;
  } catch (error) {
    console.log("[DOMAIN_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
