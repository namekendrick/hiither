"use client";

import Link from "next/link";
import { MessageSquare, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { CommentForm } from "@/features/panel/components/comment-form";
import { CommentVotes } from "@/features/panel/components/comment-votes";
import { useDeleteComment } from "@/features/panel/hooks/use-delete-comment";
import { useAuthAction } from "@/hooks/use-auth-action";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { formatTimeToNow } from "@/lib/utils";

export const PanelComment = ({
  comment,
  currentVote,
  votesAmt,
  panelId,
  isMine,
  access,
}) => {
  const commentRef = useRef(null);
  const [isReplying, setIsReplying] = useState(false);

  const mutation = useDeleteComment();
  const handleAuthAction = useAuthAction();

  useOnClickOutside(commentRef, () => {
    setIsReplying(false);
  });

  return (
    <div ref={commentRef} className="group/comment flex flex-col gap-y-4">
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            {isMine ? (
              <Link href="/profile/edit" target="_blank">
                <p className="text-sm font-bold text-gray-900">
                  {comment.author.name ?? comment.author.email.split("@")[0]}
                </p>
              </Link>
            ) : (
              <p className="text-sm font-bold text-gray-900">
                {comment.author.name ?? comment.author.email.split("@")[0]}
              </p>
            )}
            <p className="max-h-40 truncate text-xs text-zinc-500">
              {formatTimeToNow(new Date(comment.createdAt))}
            </p>
          </div>
          {isMine && (
            <Button
              onClick={() => mutation.mutate({ commentId: comment.id })}
              className="invisible group-hover/comment:visible"
              size="sm"
              variant="ghost"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
        <p className="mt-2 text-sm">{comment.text}</p>
        {access && access !== "BANNED" && (
          <div className="mt-2 flex items-center gap-2">
            <CommentVotes
              commentId={comment.id}
              votesAmt={votesAmt}
              currentVote={currentVote}
              panelId={panelId}
            />
            <Button
              onClick={() => handleAuthAction(setIsReplying(true))}
              variant="ghost"
              size="sm"
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Reply
            </Button>
          </div>
        )}
      </div>

      {isReplying && (
        <CommentForm
          comment={comment}
          panelId={panelId}
          setIsReplying={setIsReplying}
        />
      )}
    </div>
  );
};
