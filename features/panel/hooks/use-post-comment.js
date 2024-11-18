import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postComment } from "@/features/panel/api/post-comment";
import { useToast } from "@/hooks/use-toast";

export const usePostComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      await postComment(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
