"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { MoonLoader } from "react-spinners";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreatePanelModal } from "@/features/panels/components/modals/use-create-panel-modal";
import { useCreatePanel } from "@/features/panels/hooks/use-create-panel";
import { createPanelSchema } from "@/features/panels/schemas";

export const CreatePanelModal = () => {
  const modal = useCreatePanelModal();
  const mutation = useCreatePanel();
  const id = modal.id;

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(createPanelSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = (values) => {
    values.domainId = id;

    startTransition(() => {
      mutation.mutate(values, {
        onSuccess: () => {
          modal.onClose();
        },
      });
    });
  };

  return (
    <Modal
      title="Give this panel a name."
      description="An internal name to help you distinguish it from others you create."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <form className="mt-2 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Homepage Welcome"
                    disabled={isPending}
                    onKeyPress={(e) => e.charCode === 13 && e.preventDefault()}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-x-2">
            <Button
              disabled={isPending}
              onClick={modal.onClose}
              size="lg"
              variant="outline"
            >
              Cancel
            </Button>
            <Button disabled={isPending} size="lg" type="submit">
              {isPending && (
                <MoonLoader
                  size={15}
                  color="#ffffff"
                  cssOverride={{ marginRight: 8 }}
                />
              )}
              Create
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
