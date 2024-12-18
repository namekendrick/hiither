"use client";

import { useCurrentUser } from "@/features/auth/hooks";
import { PanelComment } from "@/features/panel/components/panel-comment";
import { useGetComments } from "@/features/panel/hooks/use-get-comments";

export const CommentsSection = ({ panelId }) => {
  const user = useCurrentUser();
  const { data, isLoading } = useGetComments(panelId);

  if (isLoading || !data.length) return null;

  return (
    <div>
      {data
        .filter((comment) => !comment.replyToId)
        .map((topLevelComment) => {
          const topLevelCommentVotesAmt = topLevelComment.votes.reduce(
            (acc, vote) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            },
            0,
          );

          const topLevelCommentVote = topLevelComment.votes.find(
            (vote) => vote.userId === user?.id,
          );

          return (
            <div
              key={topLevelComment.id}
              className="mt-6 flex flex-col first:mt-0 last:mb-10"
            >
              <div className="mb-2">
                <PanelComment
                  comment={topLevelComment}
                  currentVote={topLevelCommentVote}
                  votesAmt={topLevelCommentVotesAmt}
                  panelId={panelId}
                  isMine={topLevelComment.authorId === user?.id}
                />
              </div>

              {topLevelComment.replies
                .sort((a, b) => b.votes.length - a.votes.length)
                .map((reply) => {
                  const replyVotesAmt = reply.votes.reduce((acc, vote) => {
                    if (vote.type === "UP") return acc + 1;
                    if (vote.type === "DOWN") return acc - 1;
                    return acc;
                  }, 0);

                  const replyVote = reply.votes.find(
                    (vote) => vote.userId === user?.id,
                  );

                  return (
                    <div
                      key={reply.id}
                      className="ml-2 border-l-2 border-slate-200 py-2 pl-4"
                    >
                      <PanelComment
                        comment={reply}
                        currentVote={replyVote}
                        votesAmt={replyVotesAmt}
                        panelId={panelId}
                        isMine={reply.authorId === user?.id}
                      />
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
};
