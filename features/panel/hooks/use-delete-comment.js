import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteComment } from "@/features/panel/api/delete-comment";
import { useToast } from "@/hooks/use-toast";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      await deleteComment(values);
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
