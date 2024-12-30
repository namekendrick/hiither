import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getJoinsByDomainId } from "@/db/domain";
import { updateAccess } from "@/features/people/api/update-access";
import { useToast } from "@/hooks/use-toast";

export const useGetPeople = (id, page) => {
  const { data, isLoading } = useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      return await getJoinsByDomainId({ id, page });
    },
  });

  return { data, isLoading };
};

export const useUpdateAccess = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await updateAccess(values);
      toast({
        title: response.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people"] });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
