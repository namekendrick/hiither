import prisma from "@/lib/prisma";

export const getOneTimeConfirmationByUserId = async (userId) => {
  try {
    const oneTimeConfirmation = await prisma.oneTimeConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return oneTimeConfirmation;
  } catch {
    return null;
  }
};
