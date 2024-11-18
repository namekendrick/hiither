import { usePathname } from "next/navigation";

export const usePanelId = () => {
  const path = usePathname();
  return path.split("/")[2];
};
