import { useQuery } from "@tanstack/react-query";

import { getCommunityAccess } from "@/db/auth/join";

export const useGetCommunityAccess = (panelId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["access"],
    queryFn: async () => {
      return await getCommunityAccess(panelId);
    },
  });

  return { data, isLoading };
};
