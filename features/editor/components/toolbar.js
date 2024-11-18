import { forwardRef } from "react";

import { Button } from "@/components/ui/button";
import { Surface } from "./surface";
import { Tooltip } from "./tooltip";
import { cn } from "@/lib/utils";

const ToolbarWrapper = forwardRef(
  (
    {
      shouldShowContent = true,
      children,
      isVertical = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const toolbarClassName = cn(
      "text-black inline-flex h-full leading-none gap-0.5",
      isVertical ? "flex-col p-2" : "flex-row p-1 items-center",
      className,
    );

    return (
      shouldShowContent && (
        <Surface className={toolbarClassName} {...rest} ref={ref}>
          {children}
        </Surface>
      )
    );
  },
);

ToolbarWrapper.displayName = "Toolbar";

const ToolbarDivider = forwardRef(({ horizontal, className, ...rest }, ref) => {
  const dividerClassName = cn(
    "bg-neutral-200 dark:bg-neutral-800",
    horizontal
      ? "w-full min-w-[1.5rem] h-[1px] my-1 first:mt-0 last:mt-0"
      : "h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0",
    className,
  );

  return <div className={dividerClassName} ref={ref} {...rest} />;
});

ToolbarDivider.displayName = "Toolbar.Divider";

const ToolbarButton = forwardRef(
  (
    {
      children,
      buttonSize = "icon",
      variant = "ghost",
      className,
      tooltip,
      tooltipShortcut,
      activeClassname,
      ...rest
    },
    ref,
  ) => {
    const buttonClass = cn("gap-1 min-w-[2rem] px-2 w-auto", className);

    const content = (
      <Button
        activeClassname={activeClassname}
        className={buttonClass}
        variant={variant}
        buttonSize={buttonSize}
        ref={ref}
        {...rest}
      >
        {children}
      </Button>
    );

    if (tooltip) {
      return (
        <Tooltip title={tooltip} shortcut={tooltipShortcut}>
          {content}
        </Tooltip>
      );
    }

    return content;
  },
);

ToolbarButton.displayName = "ToolbarButton";

export const Toolbar = {
  Wrapper: ToolbarWrapper,
  Divider: ToolbarDivider,
  Button: ToolbarButton,
};
