/* eslint-disable import/no-anonymous-default-export */

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { getOneTimeConfirmationByUserId } from "@/db/auth/one-time-confirmation";
import { getUserByEmail } from "@/db/auth/user";
import { LoginSchema } from "@/features/auth/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Handle one-time authentication flow
        if (credentials.oneTimeAuth) {
          const user = await getUserByEmail(credentials.email);
          if (!user) return null;

          // Verify that user has a valid one-time confirmation
          const confirmation = await getOneTimeConfirmationByUserId(user.id);
          if (!confirmation) return null;

          user.oneTimeAuth = true;

          return user;
        }

        // Handle normal login flow
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};
