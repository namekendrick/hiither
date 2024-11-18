import { Icon } from "@/features/editor/components/icon";
import { Surface } from "@/features/editor/components/surface";
import { Toolbar } from "@/features/editor/components/toolbar";
import { Tooltip } from "@/features/editor/components/tooltip";

export const LinkPreviewPanel = ({ onClear, onEdit, url }) => {
  return (
    <Surface className="flex items-center gap-2 p-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-sm underline"
      >
        {url}
      </a>
      <Toolbar.Divider />
      <Tooltip title="Edit link">
        <Toolbar.Button onClick={onEdit}>
          <Icon name="Pen" />
        </Toolbar.Button>
      </Tooltip>
      <Tooltip title="Remove link">
        <Toolbar.Button onClick={onClear}>
          <Icon name="Trash2" />
        </Toolbar.Button>
      </Tooltip>
    </Surface>
  );
};
