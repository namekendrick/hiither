"use client";

import { usePathname } from "next/navigation";

import { useSidebar } from "@/hooks/use-sidebar";

export const BreadCrumb = ({ domainName }) => {
  const { page } = useSidebar();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-bold capitalize">
        {pathname.includes("admin") ? domainName?.split(".")[0] : page}
      </h2>
    </div>
  );
};
