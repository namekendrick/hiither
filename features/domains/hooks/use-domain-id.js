import { usePathname } from "next/navigation";

export const useDomainId = () => {
  const path = usePathname();
  return path.split("/")[2];
};
