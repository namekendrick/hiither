"use client";

import { EditorContent } from "@tiptap/react";
import { useRef, useState } from "react";

import { LinkMenu } from "@/features/editor/components/menus";
import { TextMenu } from "@/features/editor/components/menus";
import { ContentItemMenu } from "@/features/editor/components/menus";
import { ImageBlockMenu } from "@/features/editor/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/features/editor/extensions/MultiColumn/menus";
import {
  TableColumnMenu,
  TableRowMenu,
} from "@/features/editor/extensions/Table/menus";
import { useBlockEditor } from "@/features/editor/hooks/useBlockEditor";

import "@/styles/globals.css";

export const BlockEditor = ({ panelId, readOnly }) => {
  const editorRef = useRef(null);
  const menuContainerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const { editor } = useBlockEditor({ panelId, setIsLoading, readOnly });

  if (!editor) {
    return null;
  }

  return (
    <div className={`${!readOnly && "pb-16"}`} ref={menuContainerRef}>
      {!isLoading &&
        (readOnly ? (
          <EditorContent editor={editor} ref={editorRef} />
        ) : (
          <div className="relative flex h-full flex-1 flex-col">
            <EditorContent editor={editor} ref={editorRef} className="flex-1" />
            <ContentItemMenu editor={editor} />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
            <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
          </div>
        ))}
    </div>
  );
};
