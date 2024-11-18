"use client";

import { useEffect, useState } from "react";

import { UpgradeModal } from "@/components/modals/upgrade-modal";
import { CreatePanelModal } from "@/features/panels/components/modals/create-panel-modal";
import { DeletePanelModal } from "@/features/panels/components/modals/delete-panel-modal";
import { PublishPanelModal } from "@/features/panels/components/modals/publish-panel-modal";
import { UnpublishPanelModal } from "@/features/panels/components/modals/unpublish-panel-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreatePanelModal />
      <DeletePanelModal />
      <PublishPanelModal />
      <UnpublishPanelModal />
      <UpgradeModal />
    </>
  );
};
