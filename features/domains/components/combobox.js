"use client";

import Link from "next/link";
import { Check, ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDomainId } from "@/features/domains/hooks/use-domain-id";
import { useGetDomain } from "@/features/domains/hooks/use-get-domain";
import { useGetDomains } from "@/features/domains/hooks/use-get-domains";
import { cn } from "@/lib/utils";

export const Combobox = () => {
  const domainId = useDomainId();
  const router = useRouter();

  const { data: all, isLoading: isLoadingAll } = useGetDomains();
  const { data: current, isLoading: isLoadingCurrent } = useGetDomain(domainId);

  const [open, setOpen] = useState(false);

  if (isLoadingAll || isLoadingCurrent) return;

  return (
    <div className="flex flex-col">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {current ? current.name : "Select domain"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search domains" />
            <CommandList>
              <CommandEmpty>No domain found.</CommandEmpty>
              <CommandGroup>
                {all.map((domain) => (
                  <CommandItem
                    key={domain.id}
                    value={domain.id}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/workspace/${domain.id}/panels`);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        current?.id === domain.id ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {domain.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* {current?.id && (
        <Link href={`/c/${current.id}`}>
          <Button variant="link" className="text-xs">
            View community page
          </Button>
        </Link>
      )} */}
    </div>
  );
};
