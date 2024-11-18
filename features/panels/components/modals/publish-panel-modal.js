import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePublishPanelModal } from "@/features/panels/components/modals/use-publish-panel-modal";
import { usePublishPanel } from "@/features/panels/hooks/use-publish-panel";

export const PublishPanelModal = () => {
  const form = useForm();
  const mutation = usePublishPanel();
  const modal = usePublishPanelModal();
  const [isPending, startTransition] = useTransition();

  const id = modal.id;

  const onSubmit = () => {
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
      description="You are about to publish this panel."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <Form {...form}>
        <form className="mt-2 space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          {/* <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">
                  This panel is for...
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue="isPublic"
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="isPublic" />
                      </FormControl>
                      <FormLabel className="font-normal">Everyone</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="isPrivate" disabled={true} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        <span className="line-through">Paid members only</span>{" "}
                        <Link href="#" onClick={modal.onClose}>
                          (
                          <span className="text-blue-500 hover:underline">
                            Set up payments
                          </span>
                          )
                        </Link>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          /> */}
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
              Publish
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
