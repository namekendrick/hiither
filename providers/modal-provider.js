"use client";

import { useEffect, useState } from "react";

import { UpgradeModal } from "@/components/modals/upgrade-modal";
import { CreatePanelModal } from "@/features/panels/components/modals/create-panel-modal";
import { DeletePanelModal } from "@/features/panels/components/modals/delete-panel-modal";
import { PublishPanelModal } from "@/features/panels/components/modals/publish-panel-modal";
import { UnpublishPanelModal } from "@/features/panels/components/modals/unpublish-panel-modal";
import { ChangeAccessModal } from "@/features/people/components/modals/change-access-modal";
import { ChangeStatusModal } from "@/features/comments/components/modals/change-status-modal";

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
      <ChangeAccessModal />
      <ChangeStatusModal />
      <CreatePanelModal />
      <DeletePanelModal />
      <PublishPanelModal />
      <UnpublishPanelModal />
      <UpgradeModal />
    </>
  );
};
