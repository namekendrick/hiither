"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppDrawer } from "@/components/app-drawer";
import { useCurrentUser } from "@/features/auth/hooks";
import { AddDomainForm } from "@/features/domains/components/add-domain-form";
import { useGetDomains } from "@/features/domains/hooks/use-get-domains";

const WorkspacePage = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const [open, setOpen] = useState();
  const { data, isLoading } = useGetDomains();

  useEffect(() => {
    if (isLoading) return;

    if (user && data.length) {
      router.replace(`/workspace/${data[0].id}/panels`);
    } else if (!open) {
      setOpen(true);
    }
  }, [user, isLoading, open, setOpen, router]);

  return (
    <AppDrawer
      title="Add a domain to get started"
      description="Enter the primary address where your panels will live."
      open={open}
    >
      <AddDomainForm setOpen={setOpen} />
    </AppDrawer>
  );
};

export default WorkspacePage;
