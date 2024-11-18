import * as Popover from "@radix-ui/react-popover";

import { Icon } from "@/features/editor/components/icon";
import { LinkEditorPanel } from "@/features/editor/components/panels";
import { Toolbar } from "@/features/editor/components/toolbar";

export const EditLinkPopover = ({ onSetLink }) => {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Toolbar.Button tooltip="Set Link">
          <Icon name="Link" />
        </Toolbar.Button>
      </Popover.Trigger>
      <Popover.Content>
        <LinkEditorPanel onSetLink={onSetLink} />
      </Popover.Content>
    </Popover.Root>
  );
};
