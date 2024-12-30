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
import { useGetCommunityAccess } from "@/features/panel/hooks/use-get-access";

export const PanelWindow = forwardRef(
  ({ currentPanel, onHandleCloseButtonClicked }, ref) => {
    const user = useCurrentUser();

    const { data: access, isLoading } = useGetCommunityAccess(currentPanel.id);

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
          {!isLoading && access !== "BANNED" ? (
            access ? (
              <CommentForm
                panelId={currentPanel.id}
                setIsReplying={setIsReplying}
              />
            ) : (
              <PanelJoinForm panelId={currentPanel.id} user={user} />
            )
          ) : null}
          <CommentsSection panelId={currentPanel.id} access={access} />
        </div>
      </div>
    );
  },
);

PanelWindow.displayName = "PanelWindow";
