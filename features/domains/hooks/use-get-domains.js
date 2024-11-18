import { useQuery } from "@tanstack/react-query";

import { getCurrentUsersDomains } from "@/db/domain";

export const useGetDomains = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["domains"],
    queryFn: () => {
      return getCurrentUsersDomains();
    },
  });

  return { data, isLoading };
};
