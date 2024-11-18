import Image from "next/image";
import { NodeViewWrapper } from "@tiptap/react";
import { useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

export const ImageBlockView = (props) => {
  const { editor, getPos, node } = props;
  const imageWrapperRef = useRef(null);
  const { src } = node.attrs;

  const wrapperClassName = cn(
    node.attrs.align === "left" ? "ml-0" : "ml-auto",
    node.attrs.align === "right" ? "mr-0" : "mr-auto",
    node.attrs.align === "center" && "mx-auto",
  );

  const onClick = useCallback(() => {
    editor.commands.setNodeSelection(getPos());
  }, [getPos, editor.commands]);

  return (
    <NodeViewWrapper>
      <div className={wrapperClassName} style={{ width: node.attrs.width }}>
        <div contentEditable={false} ref={imageWrapperRef}>
          <Image
            className="block rounded-sm"
            onClick={onClick}
            src={src}
            alt=""
            width={5000}
            height={5000}
          />
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageBlockView;
