"use server";

import prisma from "@/lib/prisma";
import { signIn } from "@/auth";
import { getOneTimeConfirmationByUserId } from "@/db/auth/one-time-confirmation";
import { getOneTimeTokenByEmail } from "@/db/auth/one-time-token";
import { getUserByEmail } from "@/db/auth/user";
import { JoinSchema } from "@/features/auth/schemas";
import { sendOneTimeEmail } from "@/lib/mail";
import { generateOneTimeToken } from "@/lib/tokens";

export const panelJoin = async (values) => {
  const validatedFields = JoinSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, code } = validatedFields.data;

  if (!values.panelId) return { error: "Panel ID is required!" };

  const existingUser = await getUserByEmail(email);

  if (!code) {
    if (!existingUser)
      await prisma.user.create({
        data: { email },
      });

    const oneTimeToken = await generateOneTimeToken(email);

    await sendOneTimeEmail(oneTimeToken.email, oneTimeToken.token);

    return { oneTime: true };
  } else {
    const oneTimeToken = await getOneTimeTokenByEmail(existingUser.email);

    if (!oneTimeToken) return { error: "Invalid code!" };

    if (oneTimeToken.token !== code) return { error: "Invalid code!" };

    const hasExpired = new Date(oneTimeToken.expires) < new Date();

    if (hasExpired) return { error: "Code has expired!" };

    if (!existingUser.emailVerified) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: { emailVerified: new Date() },
      });
    }

    await prisma.oneTimeToken.delete({
      where: { id: oneTimeToken.id },
    });

    const existingConfirmation = await getOneTimeConfirmationByUserId(
      existingUser.id,
    );

    if (existingConfirmation) {
      await prisma.oneTimeConfirmation.delete({
        where: { id: existingConfirmation.id },
      });
    }

    await prisma.oneTimeConfirmation.create({
      data: { userId: existingUser.id },
    });

    try {
      await signIn("credentials", {
        email: existingUser.email,
        oneTimeAuth: true,
        redirect: false,
      });

      return { success: "Community joined!", oneTime: false };
    } catch (error) {
      return { error: "Something went wrong!" };
    }
  }
};
