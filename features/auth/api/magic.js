"use server";

import { signIn } from "@/auth";
import { JoinSchema } from "@/features/auth/schemas";

export const magic = async (values) => {
  const validatedFields = JoinSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email } = validatedFields.data;

  const { callbackUrl } = values;

  await signIn("resend", {
    email,
    callbackUrl,
    redirect: false,
  });

  return { success: "Confirmation email sent!" };
};
