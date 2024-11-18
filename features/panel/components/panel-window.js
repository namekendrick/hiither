"use client";

import { X } from "lucide-react";
import { forwardRef } from "react";

import { Separator } from "@/components/ui/separator";
import { BlockEditor } from "@/features/editor/components/block-editor";
import { CommentsSection } from "@/features/panel/components/comments-section";
import { JoinForm } from "@/features/panel/components/join-form";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/hooks";

export const PanelWindow = forwardRef(
  ({ currentPanel, onHandleCloseButtonClicked }, ref) => {
    const user = useCurrentUser();

    return (
      <div className="flex flex-col gap-y-4">
        <Button
          onClick={onHandleCloseButtonClicked}
          className="ml-auto w-fit"
          variant="ghost"
        >
          <X className="h-5 w-5" />
        </Button>
        <BlockEditor panelId={currentPanel.id} readOnly />
        <Separator />
        {!user && <JoinForm panelId={currentPanel.id} />}
        <div className="mt-5">
          <CommentsSection panelId={currentPanel.id} embed />
        </div>
      </div>
    );
  },
);

PanelWindow.displayName = "PanelWindow";
