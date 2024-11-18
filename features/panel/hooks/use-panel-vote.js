import { useMutation, useQueryClient } from "@tanstack/react-query";

import { panelVote } from "@/features/panel/api/panel-vote";
import { useToast } from "@/hooks/use-toast";

export const usePanelVote = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      await panelVote(values);
      return { panelId: values.panelId };
    },
    onSuccess: (context) => {
      queryClient.invalidateQueries({
        queryKey: ["publicPanel", context.panelId],
      });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
