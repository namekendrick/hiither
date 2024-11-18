import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { createPanel } from "@/features/panels/api/create-panel";
import { useToast } from "@/hooks/use-toast";

export const useCreatePanel = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await createPanel(values);
      router.push(`/panel/${response.panel.id}/edit`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["panels"] });
    },
    onError: (err) => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
