"use client";

import { BlockEditor } from "@/features/editor/components/block-editor";

export const PanelPreview = ({ panelId }) => {
  return (
    <div className="fixed bottom-0 right-0 top-0 z-20 h-screen w-[500px] overflow-auto rounded-l-xl border-l-[1px] bg-white px-5">
      <div className="flex flex-col">
        <BlockEditor panelId={panelId} readOnly />
      </div>
    </div>
  );
};
