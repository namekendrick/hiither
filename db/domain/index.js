"use server";

import prisma from "@/lib/prisma";
import { COMMENTS_PER_PAGE, PEOPLE_PER_PAGE } from "@/constants/pagination";
import { currentUser } from "@/lib/auth";

export const getCommentsByDomainId = async ({ id, page }) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    if (!id) return { status: 401, message: "Domain ID required!" };

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: id,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    const comments = await prisma.comment.findMany({
      where: {
        panel: {
          permission: {
            is: {
              domainId: id,
            },
          },
        },
      },
    });

    const paginated = await prisma.comment.findMany({
      take: COMMENTS_PER_PAGE,
      skip: (page - 1) * COMMENTS_PER_PAGE,
      where: {
        panel: {
          permission: {
            is: {
              domainId: id,
            },
          },
        },
      },
      include: {
        author: true,
      },
    });

    let totalPages = Math.ceil(parseInt(comments.length) / COMMENTS_PER_PAGE);

    return { paginated, totalPages };
  } catch (error) {
    console.log("[DOMAIN_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

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

export const getJoinsByDomainId = async ({ id, page }) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    if (!id) return { status: 401, message: "Domain ID required!" };

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: id,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    const joins = await prisma.join.findMany({
      where: {
        domainId: id,
      },
    });

    const paginated = await prisma.join.findMany({
      take: PEOPLE_PER_PAGE,
      skip: (page - 1) * PEOPLE_PER_PAGE,
      where: {
        domainId: id,
      },
      include: {
        user: true,
      },
    });

    let totalPages = Math.ceil(parseInt(joins.length) / PEOPLE_PER_PAGE);

    return { paginated, totalPages };
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
