import { useQuery } from "@tanstack/react-query";

import {
  getPanelsByDomainId,
  getPublicPanelByPanelId,
  getPublicPanelsByDomainId,
} from "@/db/panel";

export const useGetPanels = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["panels"],
    queryFn: async () => {
      return await getPanelsByDomainId(id);
    },
  });

  return { data, isLoading };
};

export const useGetPublicPanel = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["publicPanel", id],
    queryFn: async () => {
      return await getPublicPanelByPanelId(id);
    },
  });

  return { data, isLoading };
};

export const useGetPublicPanels = (id) => {
  const { data, isLoading } = useQuery({
    queryKey: ["publicPanels"],
    queryFn: async () => {
      return await getPublicPanelsByDomainId(id);
    },
  });

  return { data, isLoading };
};
