"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useSession } from "next-auth/react";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { newJoin } from "@/features/auth/api/new-join";
import { panelJoin } from "@/features/auth/api/panel-join";
import { JoinSchema } from "@/features/auth/schemas";

export const PanelJoinForm = ({ panelId }) => {
  const { update } = useSession();

  const [showOneTime, setShowOneTime] = useState(false);
  const [oneTimeValue, setOneTimeValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(JoinSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values) => {
    setError("");
    setSuccess("");

    values.panelId = panelId;

    startTransition(() => {
      panelJoin(values)
        .then((data) => {
          setError(data?.error);

          if (data?.oneTime) {
            setSuccess("A one-time code was sent to your inbox!");
            setShowOneTime(true);
          }

          if (data?.success) {
            update().then(() => {
              newJoin(panelId);
            });
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <Form {...form}>
      <form
        className="mb-8 space-y-2 rounded-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormError message={error} />
        <FormSuccess message={success} />
        {showOneTime ? (
          <FormField
            key="otp-input"
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    disabled={isPending}
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={oneTimeValue}
                    onChange={(value) => setOneTimeValue(value)}
                    {...field}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            key="email-input"
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-12 rounded-md bg-stone-50"
                    disabled={isPending}
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
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-500"
          type="submit"
          disabled={isPending}
        >
          Join the conversation
        </Button>
      </form>
    </Form>
  );
};
