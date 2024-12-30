import { useInfiniteQuery } from "@tanstack/react-query";

import { getCommentsByPanelId } from "@/db/comment";

export const useGetComments = (id) => {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments"],
      queryFn: async ({ pageParam = "" }) => {
        return await getCommentsByPanelId({ id, pageParam });
      },
      getNextPageParam: (lastpage) => lastpage.nextCursor ?? null,
    });

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};
