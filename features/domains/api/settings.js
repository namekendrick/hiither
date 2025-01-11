"use server";

import prisma from "@/lib/prisma";
import { addDomainSchema } from "@/features/domains/schemas";
import { currentUser } from "@/lib/auth";

export const settings = async (values) => {
  const user = await currentUser();
  if (!user) return { status: 401, message: "Unauthorized" };

  const permission = await prisma.permission.findFirst({
    where: {
      userId: user.id,
      domainId: values.domainId,
    },
  });

  if (!permission) return { status: 401, message: "Unauthorized!" };

  if (values.name) {
    const validatedFields = addDomainSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields!" };

    const { name } = validatedFields.data;

    await prisma.domain.update({
      where: { id: values.domainId },
      data: { name },
    });
  }

  return { success: "Settings updated!" };
};
