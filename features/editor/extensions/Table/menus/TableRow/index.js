import React, { useCallback } from "react";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";

import * as PopoverMenu from "@/features/editor/components/popover";
import { Icon } from "@/features/editor/components/icon";
import { Toolbar } from "@/features/editor/components/toolbar";
import { isRowGripSelected } from "./utils";

export const TableRowMenu = React.memo(({ editor, appendTo }) => {
  const shouldShow = useCallback(
    ({ view, state, from }) => {
      if (!state || !from) {
        return false;
      }

      return isRowGripSelected({ editor, view, state, from });
    },
    [editor],
  );

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run();
  }, [editor]);

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run();
  }, [editor]);

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run();
  }, [editor]);

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current;
        },
        placement: "left",
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <Toolbar.Wrapper isVertical>
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowUpToLine" />}
          close={false}
          label="Add row before"
          onClick={onAddRowBefore}
        />
        <PopoverMenu.Item
          iconComponent={<Icon name="ArrowDownToLine" />}
          close={false}
          label="Add row after"
          onClick={onAddRowAfter}
        />
        <PopoverMenu.Item
          icon="Trash"
          close={false}
          label="Delete row"
          onClick={onDeleteRow}
        />
      </Toolbar.Wrapper>
    </BaseBubbleMenu>
  );
});

TableRowMenu.displayName = "TableRowMenu";
