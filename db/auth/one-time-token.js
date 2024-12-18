import prisma from "@/lib/prisma";

export const getOneTimeTokenByToken = async (token) => {
  try {
    const oneTimeToken = await prisma.oneTimeToken.findUnique({
      where: {
        token,
      },
    });

    return oneTimeToken;
  } catch {
    return null;
  }
};

export const getOneTimeTokenByEmail = async (email) => {
  try {
    const oneTimeToken = await prisma.oneTimeToken.findFirst({
      where: {
        email,
      },
    });

    return oneTimeToken;
  } catch {
    return null;
  }
};
