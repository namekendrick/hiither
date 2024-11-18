"use client";

import { Separator } from "@/components/ui/separator";
import CodeSnippet from "@/features/domains/components/code-snippet";

const DomainSettingsPage = ({ params }) => {
  return (
    <div className="mt-[20px] flex flex-col gap-8 pb-5">
      <div className="flex flex-col gap-5">
        <h2 className="max-w-[450px] text-xl">Domain Settings</h2>
        <Separator orientation="horizontal" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">Code snippet</p>
          <p className="text-sm">
            Copy and paste this code into the header tag of your website
          </p>
        </div>
        <CodeSnippet id={params.id} />
      </div>
    </div>
  );
};

export default DomainSettingsPage;
