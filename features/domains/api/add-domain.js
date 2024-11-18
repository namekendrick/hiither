"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const addDomain = async ({ name }) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const domain = await prisma.domain.create({
      data: {
        name,
        owner: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    await prisma.domain.update({
      where: { id: domain.id },
      data: {
        permissions: {
          create: {
            user: {
              connect: {
                id: user.id,
              },
            },
            access: "OWNER",
          },
        },
      },
    });

    return {
      status: 200,
      message: "Domain added!",
      domain,
    };
  } catch (error) {
    console.log("[DOMAIN_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
