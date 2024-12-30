import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useChangeAccessModal } from "@/features/people/hooks/use-change-access-modal";
import { useUpdateAccess } from "@/features/people/hooks/use-people";

export const ChangeAccessModal = () => {
  const form = useForm();
  const mutation = useUpdateAccess();
  const modal = useChangeAccessModal();

  const [access, setAccess] = useState(modal.access);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (modal.access) setAccess(modal.access);
  }, [modal]);

  const onSubmit = () => {
    startTransition(() => {
      mutation.mutate(
        { id: modal.id, access },
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
      title="Community Access"
      description=""
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <form className="mt-2 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="access"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Change access to...</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(change) => {
                      field.onChange;
                      setAccess(change);
                    }}
                    defaultValue={modal.access}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="CONTRIBUTOR" />
                      </FormControl>
                      <FormLabel className="font-normal">Contributor</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="BANNED" />
                      </FormControl>
                      <FormLabel className="font-normal">Banned</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="TRUSTED" />
                      </FormControl>
                      <FormLabel className="font-normal">Trusted</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
          <div className="text-sm text-secondary-foreground">
            {access === "BANNED"
              ? "This person's existing comments will be deleted. They will no longer be able to comment or vote."
              : access === "TRUSTED"
                ? "This person's comments will be published automatically, bypassing spam detection and auto-moderation."
                : "This person can comment and vote. Comments are subject to spam detection and auto-moderation."}
          </div>
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
            <Button disabled={isPending} size="lg" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
