"use client";

import { X } from "lucide-react";
import { forwardRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/features/auth/hooks";
import { BlockEditor } from "@/features/editor/components/block-editor";
import { CommentForm } from "@/features/panel/components/comment-form";
import { CommentsSection } from "@/features/panel/components/comments-section";
import { PanelJoinForm } from "@/features/panel/components/panel-join-form";

export const PanelWindow = forwardRef(
  ({ currentPanel, onHandleCloseButtonClicked }, ref) => {
    const user = useCurrentUser();

    const [isReplying, setIsReplying] = useState(false);

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
        <div className="mt-5">
          {user ? (
            <CommentForm
              panelId={currentPanel.id}
              setIsReplying={setIsReplying}
            />
          ) : (
            <PanelJoinForm panelId={currentPanel.id} />
          )}
          <CommentsSection panelId={currentPanel.id} />
        </div>
      </div>
    );
  },
);

PanelWindow.displayName = "PanelWindow";
