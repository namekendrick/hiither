"use client";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCommentVote } from "@/features/panel/hooks/use-comment-vote";
import { useAuthAction } from "@/hooks/use-auth-action";
import { cn } from "@/lib/utils";

export const CommentVotes = ({ commentId, votesAmt, currentVote, panelId }) => {
  const mutation = useCommentVote();
  const handleAuthAction = useAuthAction();

  return (
    <div className="flex gap-0.5">
      {/* upvote */}
      <Button
        onClick={() =>
          handleAuthAction(mutation.mutate({ type: "UP", commentId }))
        }
        size="xs"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "fill-emerald-500 text-emerald-500": currentVote?.type === "UP",
          })}
        />
      </Button>

      {/* score */}
      <p className="px-1 py-2 text-center text-xs font-medium text-zinc-900">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        onClick={() =>
          handleAuthAction(mutation.mutate({ type: "DOWN", commentId }))
        }
        size="xs"
        className={cn({
          "text-emerald-500": currentVote?.type === "DOWN",
        })}
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "fill-red-500 text-red-500": currentVote?.type === "DOWN",
          })}
        />
      </Button>
    </div>
  );
};
