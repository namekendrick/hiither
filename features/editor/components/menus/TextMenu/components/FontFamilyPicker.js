import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { useCallback } from "react";

import {
  DropdownButton,
  DropdownCategoryTitle,
} from "@/features/editor/components/dropdown";
import { Icon } from "@/features/editor/components/icon";
import { Surface } from "@/features/editor/components/surface";
import { Toolbar } from "@/features/editor/components/toolbar";

const FONT_FAMILY_GROUPS = [
  {
    label: "Sans Serif",
    options: [
      { label: "Inter", value: "" },
      { label: "Arial", value: "Arial" },
      { label: "Helvetica", value: "Helvetica" },
    ],
  },
  {
    label: "Serif",
    options: [
      { label: "Times New Roman", value: "Times" },
      { label: "Garamond", value: "Garamond" },
      { label: "Georgia", value: "Georgia" },
    ],
  },
  {
    label: "Monospace",
    options: [
      { label: "Courier", value: "Courier" },
      { label: "Courier New", value: "Courier New" },
    ],
  },
];

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [
  group.options,
]).flat();

export const FontFamilyPicker = ({ onChange, value }) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value);
  const currentFontLabel = currentValue?.label.split(" ")[0] || "Inter";

  const selectFont = useCallback((font) => () => onChange(font), [onChange]);

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Toolbar.Button active={!!currentValue?.value}>
          {currentFontLabel}
          <Icon name="ChevronDown" className="h-2 w-2" />
        </Toolbar.Button>
      </Dropdown.Trigger>
      <Dropdown.Content asChild>
        <Surface className="flex flex-col gap-1 px-2 py-4">
          {FONT_FAMILY_GROUPS.map((group) => (
            <div
              className="mt-2.5 flex flex-col gap-0.5 first:mt-0"
              key={group.label}
            >
              <DropdownCategoryTitle>{group.label}</DropdownCategoryTitle>
              {group.options.map((font) => (
                <DropdownButton
                  isActive={value === font.value}
                  onClick={selectFont(font.value)}
                  key={`${font.label}_${font.value}`}
                >
                  <span style={{ fontFamily: font.value }}>{font.label}</span>
                </DropdownButton>
              ))}
            </div>
          ))}
        </Surface>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
