"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const getCurrentPanel = async (id) => {
  try {
    const currentPanel = await prisma.panel.findFirst({
      where: {
        id,
      },
      include: {
        joins: true,
      },
    });

    if (currentPanel) return currentPanel;
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getPanelsByDomainId = async (id) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: id,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    const panels = await prisma.panel.findMany({
      where: {
        permission: {
          is: {
            domainId: id,
          },
        },
      },
      include: {
        _count: {
          select: {
            joins: true,
            comments: true,
            votes: true,
            views: true,
          },
        },
        joins: {
          select: {
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
    });

    if (panels) return panels;
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getPrivatePanelByPanelId = async (id) => {
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

    if (!permission) return { status: 401, message: "Unauthorized!" };

    if (panel) return panel;
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getPublicPanelByPanelId = async (id) => {
  const user = await currentUser();

  try {
    const panel = await prisma.panel.findFirst({
      where: { id },
      include: {
        votes: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    panel.votesAmt = panel.votes.reduce((acc, vote) => {
      if (vote.type === "UP") return acc + 1;
      if (vote.type === "DOWN") return acc - 1;
      return acc;
    }, 0);

    panel.currentVote =
      panel.votes.find((vote) => vote.userId === user?.id) ?? null;

    if (panel) return panel;
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};

export const getPublicPanelsByDomainId = async (id) => {
  try {
    // TODO: Create 1 to many relation for domain and panels
    const panels = await prisma.panel.findMany({
      where: {
        permission: {
          is: {
            domainId: id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        content: true,
        isPublished: true,
        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
      },
    });

    if (panels) return panels;
  } catch (error) {
    console.log("[PANEL_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
