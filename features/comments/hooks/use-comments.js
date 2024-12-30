import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getCommentsByDomainId } from "@/db/domain";
import { updateStatus } from "@/features/comments/api/update-status";
import { useToast } from "@/hooks/use-toast";

export const useGetComments = (id, page) => {
  const { data, isLoading } = useQuery({
    queryKey: ["workspaceComments"],
    queryFn: async () => {
      return await getCommentsByDomainId({ id, page });
    },
  });

  return { data, isLoading };
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values) => {
      const response = await updateStatus(values);
      toast({
        title: response.message,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceComments"] });
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
