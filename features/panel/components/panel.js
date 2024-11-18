"use client";

import { PanelWindow } from "@/features/panel/components/panel-window";
import { usePanel } from "@/features/panel/hooks/use-panel";

export const Panel = () => {
  const {
    panelWindowRef,
    currentPanel,
    onHandleCloseButtonClicked,
    panelOpened,
    loading,
  } = usePanel();

  if (!panelOpened) return null;

  return (
    <div className="h-screen overflow-auto rounded-l-xl border-l-[1px] bg-white px-5 py-3">
      <PanelWindow
        ref={panelWindowRef}
        currentPanel={currentPanel}
        onHandleCloseButtonClicked={onHandleCloseButtonClicked}
      />
    </div>
  );
};
