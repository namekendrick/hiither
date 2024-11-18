"use client";

import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Navbar } from "@/app/(public)/_components/navbar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCurrentUser } from "@/features/auth/hooks";
import { useGetPublicDomainByPanelId } from "@/features/domains/hooks/use-get-domain";
import { BlockEditor } from "@/features/editor/components/block-editor";
import { CommentForm } from "@/features/panel/components/comment-form";
import { CommentsSection } from "@/features/panel/components/comments-section";
import { JoinForm } from "@/features/panel/components/join-form";
import { PanelVotes } from "@/features/panel/components/panel-votes";
import { useAddView } from "@/features/panel/hooks/use-add-view";
import { useGetPublicPanel } from "@/features/panels/hooks/use-get-panels";

const PanelPage = ({ params }) => {
  const panelId = params.id;
  const user = useCurrentUser();
  const router = useRouter();
  const mutation = useAddView();
  const { status } = useSession();

  const [isReplying, setIsReplying] = useState(false);

  const { data: domain, isLoading: isLoadingDomain } =
    useGetPublicDomainByPanelId(panelId);
  const { data: panel, isLoading: isLoadingPanel } = useGetPublicPanel(panelId);

  useEffect(() => {
    // TODO: Check for double firing in production
    mutation.mutate(panelId);
  }, [panelId]);

  if (isLoadingDomain || isLoadingPanel || status === "loading") return null;

  return (
    <div className="min-h-full">
      <Navbar domain={domain} panelId={panelId} />
      <div className="mx-auto max-w-[1100px] p-4 pt-20">
        <div className="mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-4">
          <div className="col-span-2 mb-32 flex flex-col gap-y-4">
            <BlockEditor panelId={panelId} readOnly />
            <div className="mx-4 mt-2 flex items-center gap-2">
              <PanelVotes
                panelId={panelId}
                votesAmt={panel.votesAmt}
                currentVote={panel.currentVote}
              />
              <Button
                onClick={() => setIsReplying(true)}
                variant="ghost"
                size="sm"
              >
                <MessageSquare className="mr-1.5 h-4 w-4" />
                {panel._count.comments}
              </Button>
            </div>
            <Separator />
            <div className="m-4">
              <CommentForm panelId={panelId} setIsReplying={setIsReplying} />
              <CommentsSection panelId={panelId} />
            </div>
          </div>
          <div className="col-span-1 flex h-fit max-w-sm flex-col gap-y-2 rounded-lg border p-4 shadow-md">
            <a
              href={`http://${domain.name}`}
              target="_blank"
              className="line-clamp-2 text-sm font-bold hover:underline"
            >
              {domain.name}
            </a>
            <p className="text-sm">
              Community created{" "}
              {new Date(domain.createdAt).toLocaleDateString("en-us", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            {!domain.isMember &&
              (user ? (
                <div className="pt-6">
                  <JoinForm
                    domainId={domain.id}
                    panelId={panelId}
                    email={user.email}
                  />
                </div>
              ) : (
                <Button
                  className="mt-4 w-fit min-w-[80px] bg-indigo-600 font-semibold hover:bg-indigo-500"
                  onClick={() =>
                    router.push(`/c/${domain.id}/join?p=${panelId}`)
                  }
                >
                  Join the conversation
                </Button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelPage;
