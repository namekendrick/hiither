import { useQuery } from "@tanstack/react-query";

import {
  getCurrentDomainByDomainId,
  getPublicDomainByDomainId,
  getPublicDomainByPanelId,
} from "@/db/domain";

export const useGetDomain = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["domain", id],
    queryFn: () => {
      return getCurrentDomainByDomainId(id);
    },
  });

  return { data, isLoading };
};

export const useGetPublicDomainByDomainId = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["publicDomain", id],
    queryFn: () => {
      return getPublicDomainByDomainId(id);
    },
  });

  return { data, isLoading };
};

export const useGetPublicDomainByPanelId = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["publicDomain", id],
    queryFn: () => {
      return getPublicDomainByPanelId(id);
    },
  });

  return { data, isLoading };
};
