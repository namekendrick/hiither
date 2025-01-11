"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AppDrawer } from "@/components/app-drawer";
import { Button } from "@/components/ui/button";
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
      description="Enter the primary domain where your panels will live."
      open={open}
    >
      <div className="flex w-full flex-col items-center space-y-10">
        <AddDomainForm setOpen={setOpen} />
        <Button variant="link" size="sm" asChild>
          <Link href="/profile/edit">View profile</Link>
        </Button>
      </div>
    </AppDrawer>
  );
};

export default WorkspacePage;
