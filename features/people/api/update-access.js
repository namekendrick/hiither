"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";

export const updateAccess = async (values) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 401, message: "Unauthorized!" };

    const { id, access } = values;

    const join = await prisma.join.findUnique({
      where: { id },
    });

    const permission = await prisma.permission.findFirst({
      where: {
        userId: user.id,
        domainId: join.domainId,
      },
    });

    if (!permission) return { status: 401, message: "Unauthorized!" };

    await prisma.join.update({
      where: { id },
      data: { access },
    });

    if (access === "BANNED") {
      await prisma.comment.updateMany({
        where: {
          AND: [
            { authorId: join.userId },
            {
              panel: {
                permission: {
                  is: {
                    domainId: join.domainId,
                  },
                },
              },
            },
          ],
        },
        data: { status: "DELETED" },
      });
    }

    return {
      status: 200,
      message: "Record updated!",
    };
  } catch (error) {
    console.log("[PEOPLE_ERROR],", error);
    return { status: 500, message: "Internal Error" };
  }
};
