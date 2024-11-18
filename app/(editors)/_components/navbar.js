"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { usePublishPanelModal } from "@/features/panels/components/modals/use-publish-panel-modal";

export const Navbar = ({ panelId, isPublished }) => {
  const router = useRouter();
  const openModal = usePublishPanelModal((state) => state.onOpen);

  return (
    <nav className="sticky top-0 z-10 flex flex-col">
      <div className="flex w-full items-center justify-between px-4 py-3">
        <div className="relative h-8 w-8 sm:h-10 sm:w-10">
          <Button
            className="px-2"
            onClick={() =>
              // TODO: Go back to panel's domain
              router.push(`/workspace`)
            }
            variant="secondary"
          >
            <ArrowLeft />
          </Button>
        </div>
        {!isPublished && (
          <Button className="font-bold" onClick={() => openModal(panelId)}>
            Continue
          </Button>
        )}
      </div>
    </nav>
  );
};
