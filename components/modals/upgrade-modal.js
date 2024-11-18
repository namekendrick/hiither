"use client";

import { useUpgradeModal } from "@/components/modals/use-upgrade-modal";
import { Modal } from "@/components/ui/modal";
import { SubscriptionButton } from "@/features/auth/components/subscription-button";
import { Separator } from "../ui/separator";

export const UpgradeModal = () => {
  const modal = useUpgradeModal();

  return (
    <Modal isOpen={modal.isOpen} onClose={modal.onClose}>
      <div className="flex flex-col gap-y-8 pb-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-bold">Please upgrade to continue</h1>
          <p>
            Create <span className="font-bold text-blue-500">unlimited</span>{" "}
            panels that convert!
          </p>
          <Separator className="h-[0.1px] bg-slate-400" />
        </div>
        <div className="flex justify-between">
          <p className="text-3xl font-bold">
            $19<span className="text-base">.00 / mo</span>
          </p>
          <SubscriptionButton />
        </div>
      </div>
    </Modal>
  );
};
