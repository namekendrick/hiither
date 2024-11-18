import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { autosave } from "@/features/panels/api/autosave";

export const useAutosave = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await autosave(values);
      toast({ title: response.message });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["panels"] });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return { mutation };
};
