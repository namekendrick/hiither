"use server";

import { signIn } from "@/auth";
import { getPublicDomainByPanelId } from "@/db/domain";
import { newJoin } from "@/features/auth/api/new-join";
import { JoinSchema } from "@/features/auth/schemas";
import { currentUser } from "@/lib/auth";

export const join = async (values) => {
  const user = await currentUser();
  const validatedFields = JoinSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email } = validatedFields.data;

  if (values.panelId) {
    const { panelId } = values;
    const { id: domainId } = await getPublicDomainByPanelId(panelId);

    if (user) {
      await newJoin(domainId, panelId);
    } else {
      await signIn("resend", {
        email,
        redirect: false,
        redirectTo: `/auth/new-join?domain=${domainId}&panel=${panelId}`,
      });

      return { success: "Confirmation email sent!" };
    }
  }

  if (values.domainId) {
    if (user) {
      await newJoin(values.domainId);
    } else {
      await signIn("resend", {
        email,
        redirect: false,
        redirectTo: `/auth/new-join?domain=${values.domainId}`,
      });

      return { success: "Confirmation email sent!" };
    }
  }
};
