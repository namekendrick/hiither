"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { analytics } from "@/lib/segment";

export const useSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [expand, setExpand] = useState(true);

  const page = pathname.split("/").pop();

  const onSignOut = () => {
    analytics.reset();
    signOut(() => router.push("/"));
  };

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
  };
};
