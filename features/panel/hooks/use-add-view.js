import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addView } from "@/features/panel/api/add-view";
import { useToast } from "@/hooks/use-toast";

export const useAddView = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      await addView(values);
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
