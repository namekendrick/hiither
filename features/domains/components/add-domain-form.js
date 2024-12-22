"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAddDomain } from "@/features/domains/hooks/use-add-domain";
import { addDomainSchema } from "@/features/domains/schemas";

export const AddDomainForm = ({ setOpen }) => {
  const mutation = useAddDomain();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(addDomainSchema),
    defaultValues: {
      name: undefined,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      mutation.mutate(values, {
        onSuccess: () => {
          setOpen(false);
        },
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className="mt-4 w-full max-w-[400px] space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="awesomewebsite.com"
                  disabled={isPending}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Add domain
        </Button>
      </form>
    </Form>
  );
};
