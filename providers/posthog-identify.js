"use client";

import { usePostHog } from "posthog-js/react";
import { useEffect } from "react";

import { useCurrentUser } from "@/features/auth/hooks";

export default function PostHogIdentify() {
  const user = useCurrentUser();
  const posthog = usePostHog();

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, {
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        isOAuth: user.isOAuth,
        isTwoFactorEnabled: user.isTwoFactorEnabled,
      });

      localStorage.setItem("user", user.id);
    } else {
      if (localStorage.getItem("user")) posthog.reset(true);
      localStorage.removeItem("user");
    }
  }, [user]);

  return null;
}
