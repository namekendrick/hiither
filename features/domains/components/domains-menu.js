import Image from "next/image";

import { Combobox } from "@/features/domains/components/combobox";
import { useGetDomains } from "@/features/domains/hooks/use-get-domains";

export const DomainsMenu = ({ onExpand, min }) => {
  const { data } = useGetDomains();

  return (
    <div className="mb-8 mt-3 flex flex-col gap-3">
      {data &&
        (min ? (
          <div className="flex cursor-pointer justify-center gap-3 rounded-lg p-2 transition duration-100 ease-in-out hover:bg-white">
            <div className="relative flex h-8 w-8">
              <Image
                src="/images/owl.png"
                alt="logo"
                onClick={onExpand}
                className="rounded-sm"
                fill
              />
            </div>
          </div>
        ) : (
          <Combobox />
        ))}
    </div>
  );
};
