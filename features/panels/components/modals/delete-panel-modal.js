import { useTransition } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useDeletePanelModal } from "@/features/panels/components/modals/use-delete-panel-modal";
import { useDeletePanel } from "@/features/panels/hooks/use-delete-panel";

export const DeletePanelModal = () => {
  const modal = useDeletePanelModal();
  const id = modal.id;
  const mutation = useDeletePanel();

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
      description="You are about to delete this panel."
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
          Delete
        </Button>
      </div>
    </Modal>
  );
};
