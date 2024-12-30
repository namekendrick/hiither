import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useChangeStatusModal } from "@/features/comments/hooks/use-change-status-modal";
import { useUpdateStatus } from "@/features/comments/hooks/use-comments";
import { cn } from "@/lib/utils";

export const ChangeStatusModal = () => {
  const form = useForm();
  const mutation = useUpdateStatus();
  const modal = useChangeStatusModal();

  const [action, setAction] = useState(modal.action);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (modal.action) setAction(modal.action);
  }, [modal]);

  const onSubmit = () => {
    startTransition(() => {
      mutation.mutate(
        { id: modal.id, action },
        {
          onSuccess: () => {
            modal.onClose();
          },
        },
      );
    });
  };

  return (
    <Modal
      title={
        action === "delete"
          ? "Delete Comment?"
          : action === "review"
            ? "Review Comment"
            : "Publish Comment?"
      }
      description={
        action === "delete"
          ? "It will be removed from the panel immediately."
          : action === "review"
            ? "This is currently published, but was flagged for your review."
            : "It will become visible on the panel immediately."
      }
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <form className="mt-2 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-x-2">
            <Button
              disabled={isPending}
              onClick={modal.onClose}
              size="lg"
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              size="lg"
              type="submit"
              className={cn(
                action === "publish" && "bg-emerald-500 hover:bg-emerald-400",
                action === "delete" && "bg-rose-500 hover:bg-rose-400",
              )}
            >
              {action === "review" ? "Looks good" : "Confirm"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
