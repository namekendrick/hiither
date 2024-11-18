import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePanel } from "@/features/panels/api/delete-panel";
import { useToast } from "@/hooks/use-toast";

export const useDeletePanel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await deletePanel(id);
      toast({
        title: response.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["panels"] });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
