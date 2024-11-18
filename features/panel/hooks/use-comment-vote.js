import { useMutation, useQueryClient } from "@tanstack/react-query";

import { commentVote } from "@/features/panel/api/comment-vote";
import { useToast } from "@/hooks/use-toast";

export const useCommentVote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      await commentVote(values);
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
