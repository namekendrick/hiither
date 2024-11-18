import { useMutation, useQueryClient } from "@tanstack/react-query";

import { renamePanel } from "@/features/panels/api/rename-panel";
import { useToast } from "@/hooks/use-toast";

export const useRenamePanel = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await renamePanel(values);
      toast({ title: response.message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
