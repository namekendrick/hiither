import { mergeAttributes } from "@tiptap/core";

import { Figure } from "../Figure";
import { Quote } from "./Quote";
import { QuoteCaption } from "./QuoteCaption";

export const BlockquoteFigure = Figure.extend({
  name: "blockquoteFigure",

  group: "block",

  content: "quote quoteCaption",

  isolating: true,

  addExtensions() {
    return [Quote, QuoteCaption];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(HTMLAttributes, { "data-type": this.name }),
      ["div", {}, 0],
    ];
  },

  addKeyboardShortcuts() {
    return {
      Enter: () => false,
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),
    };
  },

  addCommands() {
    return {
      setBlockquote:
        () =>
        ({ state, chain }) => {
          const position = state.selection.$from.start();
          const selectionContent = state.selection.content();

          return chain()
            .focus()
            .insertContent({
              type: this.name,
              content: [
                {
                  type: "quote",
                  content: selectionContent.content.toJSON() || [
                    {
                      type: "paragraph",
                      attrs: {
                        textAlign: "left",
                      },
                    },
                  ],
                },
                {
                  type: "quoteCaption",
                },
              ],
            })
            .focus(position + 1)
            .run();
        },
    };
  },
});

export default BlockquoteFigure;
