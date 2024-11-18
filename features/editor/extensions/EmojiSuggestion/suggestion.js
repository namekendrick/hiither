import tippy from "tippy.js";
import { ReactRenderer } from "@tiptap/react";

import EmojiList from "./components/EmojiList";

export const emojiSuggestion = {
  items: ({ editor, query }) =>
    editor.storage.emoji.emojis
      .filter(
        ({ shortcodes, tags }) =>
          shortcodes.find((shortcode) =>
            shortcode.startsWith(query.toLowerCase()),
          ) || tags.find((tag) => tag.startsWith(query.toLowerCase())),
      )
      .slice(0, 250),

  allowSpaces: false,

  render: () => {
    let component;
    let popup;

    return {
      onStart: (props) => {
        component = new ReactRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        popup = tippy("body", {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup[0].hide();
          component.destroy();

          return true;
        }

        return component.ref?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
