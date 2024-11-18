import { useTransition } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useUnpublishPanelModal } from "@/features/panels/components/modals/use-unpublish-panel-modal";
import { useUnpublishPanel } from "@/features/panels/hooks/use-unpublish-panel";

export const UnpublishPanelModal = () => {
  const modal = useUnpublishPanelModal();
  const id = modal.id;
  const mutation = useUnpublishPanel();

  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      mutation.mutate(id, {
        onSuccess: () => {
          modal.onClose();
        },
      });
    });
  };

  return (
    <Modal
      title="Are you sure?"
      description="You are about to unpublish this panel."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <div className="flex gap-x-2">
        <Button
          className="text-md"
          disabled={isPending}
          onClick={modal.onClose}
          size="lg"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          className="text-md"
          disabled={isPending}
          onClick={handleClick}
          size="lg"
          variant="destructive"
        >
          Unpublish
        </Button>
      </div>
    </Modal>
  );
};
