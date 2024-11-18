import TiptapHeading from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";

export const Heading = TiptapHeading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const nodeLevel = parseInt(node.attrs.level, 10);
    const hasLevel = this.options.levels.includes(nodeLevel);
    const level = hasLevel ? nodeLevel : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});

export default Heading;
