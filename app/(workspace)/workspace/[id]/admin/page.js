"use client";

import { Separator } from "@/components/ui/separator";
import { CodeSnippet } from "@/features/domains/components/code-snippet";
import { DomainNameForm } from "@/features/domains/components/domain-name-form";
import { useGetDomain } from "@/features/domains/hooks/use-get-domain";

const DomainSettingsPage = ({ params }) => {
  const { data, isLoading } = useGetDomain(params.id);

  if (isLoading) return null;

  return (
    <div className="mt-[20px] flex flex-col gap-8 pb-5">
      <div className="flex flex-col gap-5">
        <h2 className="max-w-[450px] text-xl">Domain Settings</h2>
        <Separator orientation="horizontal" />
      </div>
      <DomainNameForm domain={data} />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">Code snippet</p>
          <p className="text-sm">
            Copy and paste this code into the global{" "}
            <span className="rounded-md bg-stone-100 px-1 py-0.5">
              &lt;head&gt;
            </span>{" "}
            tag of your website.
          </p>
        </div>
        <CodeSnippet />
      </div>
    </div>
  );
};

export default DomainSettingsPage;
