import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { settings } from "@/features/auth/api/settings";
import { AccountSettingsSchema } from "@/features/auth/schemas";
import { useToast } from "@/hooks/use-toast";

export function ProfileNameForm({ user }) {
  const { update } = useSession();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(AccountSettingsSchema),
    defaultValues: {
      name: user.name || undefined,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.success) {
            update();
            toast({
              description: "Name updated!",
            });
          }
        })
        .catch(() =>
          toast({
            description: "Something went wrong.",
            variant: "destructive",
          }),
        );
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="font-bold">Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder="Please enter a name"
                  className="h-12 text-ellipsis rounded-lg font-medium outline-none"
                  {...field}
                ></Input>
              </FormControl>
            </FormItem>
          )}
        />
        {form.getValues("name") !== user.name && (
          <div className="mt-2 flex justify-end gap-x-2">
            <Button
              type="submit"
              disabled={isPending}
              className="w-fit rounded-lg px-5 font-bold"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                form.resetField("name");
                form.setValue("name", user.name);
              }}
              disabled={isPending}
              variant="secondary"
              className="w-fit rounded-lg px-5 font-bold"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
