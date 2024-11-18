"use server";

import { MagicLink } from "@/emails/magic-link";
import { resend } from "@/lib/mail";

export async function sendVerificationRequest(params) {
  const { identifier, url } = params;

  const { host } = new URL(url);

  try {
    const data = await resend.emails.send({
      from: "Kendrick from Hiither <hello@updates.hiither.com>",
      to: [identifier],
      subject: `Log in to ${host}`,
      text: text({ url, host }),
      react: MagicLink({ url, host }),
    });

    return { success: true, data };
  } catch (error) {
    throw new Error("Failed to send the verification Email.");
  }
}

function text({ url, host }) {
  return `Sign in to ${host}\n${url}\n\n`;
}
