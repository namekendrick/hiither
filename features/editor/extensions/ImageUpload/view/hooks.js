"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { uploadImage } from "@/features/editor/api/uploadImage";
import { usePanelId } from "@/features/panels/hooks/use-panel-id";

export const useImageUploader = ({ onUpload }) => {
  const panelId = usePanelId();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  const mutation = useMutation({
    mutationFn: async (values) => {
      await uploadImage({
        id: panelId,
        image: values.image.allEntries[0].cdnUrl,
      });

      onUpload(values.image.allEntries[0].cdnUrl);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  const form = useForm({
    defaultValues: {
      image: undefined,
    },
  });

  const onSubmit = (values) => {
    startTransition(() => {
      mutation.mutate(values);
    });
  };

  return { form, onSubmit, isPending };
};
