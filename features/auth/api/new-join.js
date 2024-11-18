"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const newJoin = async (domain, panel) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized!" };

  const existing = await prisma.join.findUnique({
    where: {
      userId_domainId: {
        userId: user.id,
        domainId: domain,
      },
    },
  });

  if (existing) {
    if (panel)
      return redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/p/${panel}`));
    return redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/c/${domain}`));
  }

  if (panel) {
    const u = await prisma.user.update({
      where: { id: user.id },
      data: {
        joins: {
          create: {
            domain: {
              connect: {
                id: domain,
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

    return redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/p/${panel}`));
  } else {
    const u = await prisma.user.update({
      where: { id: user.id },
      data: {
        joins: {
          create: {
            domain: {
              connect: {
                id: domain,
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

    return redirect(new URL(`${process.env.NEXT_PUBLIC_APP_URL}/c/${domain}`));
  }
};
