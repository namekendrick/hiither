"use client";

import { useSearchParams } from "next/navigation";

import { JoinForm } from "@/features/panel/components/join-form";

const CommunityJoinPage = ({ params }) => {
  const domainId = params.id;
  const panelId = useSearchParams().get("p");

  return (
    <div className="flex h-full">
      <div className="m-auto flex flex-col gap-y-6">
        <h2 className="text-center text-3xl font-black text-slate-800">
          What's your email?
        </h2>
        <JoinForm domainId={domainId} panelId={panelId} />
      </div>
    </div>
  );
};

export default CommunityJoinPage;
