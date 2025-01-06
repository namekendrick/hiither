"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useCurrentUser } from "@/features/auth/hooks";
import { analytics } from "@/lib/segment";

export const Analytics = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useCurrentUser();

  useEffect(() => {
    analytics.page();
  }, [pathname, searchParams]);

  useEffect(() => {
    if (user) {
      analytics.identify(user.id, {
        email: user.email,
      });
    }
  }, [user]);

  return null;
};
