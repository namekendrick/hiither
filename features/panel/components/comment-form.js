"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CommentSchema } from "@/features/panel/schemas";
import { usePostComment } from "@/features/panel/hooks/use-post-comment";
import { useAuthAction } from "@/hooks/use-auth-action";

export const CommentForm = ({ comment, panelId, setIsReplying }) => {
  const mutation = usePostComment();
  const handleAuthAction = useAuthAction();
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      text: comment ? `@${comment.author.email.split("@")[0]} ` : undefined,
    },
  });

  const { isValid } = form.formState;

  const onSubmit = (values) => {
    values.panelId = panelId;
    values.replyToId = comment?.replyToId ?? comment?.id;

    startTransition(() => {
      mutation.mutate(values, {
        onSuccess: () => {
          form.setValue("text", "", { shouldValidate: false });
          setIsReplying(false);
        },
      });
    });
  };

  return (
    <Form {...form}>
      <form className="mb-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  autoFocus
                  rows={1}
                  className="overflow-hidden"
                  disabled={isPending}
                  placeholder={!comment && "What are your thoughts?"}
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length,
                    )
                  }
                  onInput={(e) => {
                    e.target.style.height = "0px";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  {...field}
                />
              </FormControl>
              <div className="flex gap-x-2">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        {isValid && (
          <div className="mt-2 flex justify-end gap-2">
            <Button
              tabIndex={-1}
              variant="ghost"
              onClick={() => {
                form.resetField("text");
                setIsReplying(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              Post
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
