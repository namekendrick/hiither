"use client";

import { FileUploaderMinimal } from "@uploadcare/react-uploader";

import { useImageUploader } from "./hooks";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import "@uploadcare/react-uploader/core.css";

export const ImageUploader = ({ onUpload }) => {
  const { form, onSubmit, isPending } = useImageUploader({ onUpload });

  return (
    <Form {...form}>
      <form
        className="mt-4 w-full max-w-[400px] space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploaderMinimal
                  {...field}
                  pubkey="d6b5f2a9dae5ded5d6bb"
                  maxLocalFileSizeBytes={5000000}
                  multiple={false}
                  imgOnly={true}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending} className="w-full">
          Upload image
        </Button>
      </form>
    </Form>
  );
};
