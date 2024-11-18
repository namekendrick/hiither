import { forwardRef } from "react";

import { Icon } from "@/features/editor/components/icon";
import { cn } from "@/lib/utils";

export const CommandButton = forwardRef(
  ({ active, icon, onClick, title }, ref) => {
    const wrapperClass = cn(
      "flex text-neutral-500 items-center text-xs font-semibold justify-start p-1.5 gap-2 rounded",
      !active && "bg-transparent hover:bg-neutral-50 hover:text-black",
      active && "bg-neutral-100 text-black hover:bg-neutral-100",
    );

    return (
      <button ref={ref} onClick={onClick} className={wrapperClass}>
        <Icon name={icon} className="h-3 w-3" />
        <div className="flex flex-col items-start justify-start">
          <div className="text-sm font-medium">{title}</div>
        </div>
      </button>
    );
  },
);

CommandButton.displayName = "CommandButton";
