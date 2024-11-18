import Link from "next/link";

import { useDomainId } from "@/features/domains/hooks/use-domain-id";
import { cn } from "@/lib/utils";

export const MenuItem = ({
  size,
  path,
  icon,
  label,
  current,
  onSignOut,
  options,
}) => {
  const domainId = useDomainId();

  switch (size) {
    case "max":
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            "my-1 flex items-center gap-2 rounded-lg px-2 py-2",
            !current
              ? "text-gray-500"
              : current == path
                ? "bg-white font-bold text-black"
                : "text-gray-500",
          )}
          href={
            path
              ? options
                ? `/${path}`
                : `/workspace/${domainId}/${path}`
              : "#"
          }
        >
          {icon} {label}
        </Link>
      );
    case "min":
      return (
        <Link
          onClick={onSignOut}
          className={cn(
            !current
              ? "text-gray-500"
              : current == path
                ? "bg-white font-bold text-black"
                : "text-gray-500",
            "my-1 rounded-lg px-2 py-2",
          )}
          href={
            path
              ? options
                ? `/${path}`
                : `/workspace/${domainId}/${path}`
              : "#"
          }
        >
          {icon}
        </Link>
      );
    default:
      return null;
  }
};
