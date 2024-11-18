"use client";

import { MaxMenu } from "./max-menu";
import { MinMenu } from "./min-menu";
import { useGetDomains } from "@/features/domains/hooks/use-get-domains";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

export const SideBar = () => {
  const { expand, onExpand, page, onSignOut } = useSidebar();
  const { isLoading } = useGetDomains();

  if (isLoading) return;

  return (
    <div
      className={cn(
        "fixed z-50 h-full w-[72px] bg-stone-50 fill-mode-forwards dark:bg-neutral-950 md:relative",
        expand == undefined && "",
        expand == true
          ? "animate-open-sidebar"
          : expand == false && "animate-close-sidebar",
      )}
    >
      {expand ? (
        <MaxMenu current={page} onShrink={onExpand} onSignOut={onSignOut} />
      ) : (
        <MinMenu current={page} onExpand={onExpand} onSignOut={onSignOut} />
      )}
    </div>
  );
};
