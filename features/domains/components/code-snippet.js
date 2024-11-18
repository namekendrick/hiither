"use client";

import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const CodeSnippet = () => {
  const { toast } = useToast();

  let snippet = `
    <!-- Start of Hiither Embed Code -->
    <script src="${process.env.NEXT_PUBLIC_APP_URL}/embed.js"></script>
    <!-- End of Hiither Embed Code -->
  `;

  return (
    <div className="relative w-full rounded-lg bg-stone-100">
      <Button
        className="absolute right-5 top-5 cursor-pointer bg-slate-700"
        onClick={() => {
          navigator.clipboard.writeText(snippet);
          toast({
            title: "Copied to clipboard",
            description: "You can now paste the code inside your website",
          });
        }}
      >
        <Copy className="h-5 w-5 text-white" />
      </Button>
      <div className="overflow-auto">
        <pre>
          <code className="text-sm text-gray-500">{snippet}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeSnippet;
