"use client";

import { usePathname } from "next/navigation";

import { BreadCrumb } from "./bread-crumb";
import { useDomainId } from "@/features/domains/hooks/use-domain-id";
import { useGetDomain } from "@/features/domains/hooks/use-get-domain";
import { CreatePanelButton } from "@/features/panels/components/create-panel-button";

export const InfoBar = () => {
  const path = usePathname();
  const domainId = useDomainId();
  const { data, isLoading } = useGetDomain(domainId);

  if (isLoading) return;

  return (
    <nav className="sticky top-0 flex w-full items-start justify-between bg-white py-5">
      <BreadCrumb domainName={data?.name} />
      {path.includes("panels") ? (
        <CreatePanelButton domainId={data?.id} />
      ) : null}
    </nav>
  );
};
