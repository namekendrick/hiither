import { useQuery } from "@tanstack/react-query";

import { getCommentsByPanelId } from "@/db/comment";

export const useGetComments = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: async () => {
      return await getCommentsByPanelId(id);
    },
  });

  return { data, isLoading };
};
