"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";

export const useSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [expand, setExpand] = useState(true);

  const page = pathname.split("/").pop();

  const onSignOut = () => signOut(() => router.push("/"));

  const onExpand = () => setExpand((prev) => !prev);

  return {
    expand,
    onExpand,
    page,
    onSignOut,
  };
};
