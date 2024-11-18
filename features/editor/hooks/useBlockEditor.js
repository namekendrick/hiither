import { ExtensionKit } from "@/features/editor/extensions/extension-kit";
import { useEditor } from "@tiptap/react";

import { getPrivatePanelByPanelId, getPublicPanelByPanelId } from "@/db/panel";
import { useAutosave } from "@/features/panels/hooks/use-autosave";
import { initialContent } from "@/lib/tiptap/initial-content";

let timeoutId;

export const useBlockEditor = ({ panelId, setIsLoading, readOnly }) => {
  const { mutation } = useAutosave();

  const editor = useEditor(
    {
      autofocus: true,
      editable: !readOnly,
      immediatelyRender: false,
      onCreate: async ({ editor }) => {
        //TODO: Check if separating these actions is necessary
        if (readOnly) {
          await getPublicPanelByPanelId(panelId).then((res) => {
            if (res.content) {
              editor.commands.setContent(res.content);
            } else {
              editor.commands.setContent(initialContent);
            }
          });
        } else {
          await getPrivatePanelByPanelId(panelId).then((res) => {
            if (res.content) {
              editor.commands.setContent(res.content);
            } else {
              editor.commands.setContent(initialContent);
            }
          });
        }

        setIsLoading(false);
      },
      onUpdate: ({ editor }) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          const json = editor.getJSON().content;
          mutation.mutate({ id: panelId, json: JSON.stringify(json) });
        }, 2000);
      },
      //TODO: Add undo/redo functionality
      extensions: [...ExtensionKit()],
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class: "min-h-full",
        },
      },
    },
    [],
  );

  return { editor };
};
