"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { join } from "@/features/auth/api/join";
import { JoinSchema } from "@/features/auth/schemas";

export const JoinForm = ({ domainId, panelId, email }) => {
  const queryClient = useQueryClient();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(JoinSchema),
    defaultValues: { email: email ?? "" },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    values.domainId = domainId;
    values.panelId = panelId;

    startTransition(() => {
      join(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        queryClient.invalidateQueries({ queryKey: ["publicDomain", domainId] });
        queryClient.invalidateQueries({ queryKey: ["publicDomain", panelId] });
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-2 rounded-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {!success && !error && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-md bg-stone-50"
                    disabled={isPending || email}
                    placeholder="michael.scott@dundermifflin.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          className="w-full bg-indigo-600 font-bold hover:bg-indigo-500"
          type="submit"
          disabled={isPending || success || error}
        >
          Join the conversation
        </Button>
      </form>
    </Form>
  );
};
