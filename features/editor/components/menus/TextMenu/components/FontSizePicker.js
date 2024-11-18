import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useCallback } from "react";

import { DropdownButton } from "@/features/editor/components/dropdown";
import { Icon } from "@/features/editor/components/icon";
import { Surface } from "@/features/editor/components/surface";
import { Toolbar } from "@/features/editor/components/toolbar";

const FONT_SIZES = [
  { label: "Smaller", value: "12px" },
  { label: "Small", value: "14px" },
  { label: "Medium", value: "" },
  { label: "Large", value: "18px" },
  { label: "Extra Large", value: "24px" },
];

export const FontSizePicker = ({ onChange, value }) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value);
  const currentSizeLabel = currentValue?.label.split(" ")[0] || "Medium";

  const selectSize = useCallback((size) => () => onChange(size), [onChange]);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button active={!!currentValue?.value}>
          {currentSizeLabel}
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {FONT_SIZES.map((size) => (
            <DropdownButton
              isActive={value === size.value}
              onClick={selectSize(size.value)}
              key={`${size.label}_${size.value}`}
            >
              <span style={{ fontSize: size.value }}>{size.label}</span>
            </DropdownButton>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
