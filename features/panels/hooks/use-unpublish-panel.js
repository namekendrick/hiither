import { useMutation, useQueryClient } from "@tanstack/react-query";

import { unpublishPanel } from "@/features/panels/api/unpublish-panel";
import { useToast } from "@/hooks/use-toast";

export const useUnpublishPanel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await unpublishPanel(id);
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
