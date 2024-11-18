"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { namePanelSchema } from "@/features/panels/schemas";
import { useRenamePanel } from "@/features/panels/hooks/use-rename-panel";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

export const RenamePanelForm = ({ id, original, setRenamingPanel }) => {
  const inputRef = useRef();
  const mutation = useRenamePanel();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(namePanelSchema),
    defaultValues: { title: original },
  });

  useOnClickOutside(inputRef, () => {
    const title = form.getValues("title");
    if (title !== original) {
      onSubmit({ id, title });
    } else {
      setRenamingPanel(false);
    }
  });

  const onSubmit = (values) => {
    startTransition(() => {
      mutation.mutate(values, {
        onSuccess: () => setRenamingPanel(false),
      });
    });
  };

  return (
    <div ref={inputRef}>
      <Form {...form}>
        <form
          className="w-full max-w-[300px]"
          onSubmit={(e) => e.preventDefault()}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} disabled={isPending}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
