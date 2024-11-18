import prisma from "@/lib/prisma";

export const getUserByEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch {
    return null;
  }
};

// TODO: Commenting moved to platform; use other getUser and delete
export const getUserByJoinId = async (id) => {
  try {
    const data = await prisma.join.findFirst({
      where: { id },
      select: {
        user: true,
      },
    });

    return data.user;
  } catch {
    return null;
  }
};
