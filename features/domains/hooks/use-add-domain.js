import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { addDomain } from "@/features/domains/api/add-domain";
import { useToast } from "@/hooks/use-toast";

export const useAddDomain = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await addDomain(values);
      toast({ description: response.message });
      router.push(`/workspace/${response.domain.id}/admin`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["domains"] });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
