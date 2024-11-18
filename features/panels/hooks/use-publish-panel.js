import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Clipboard } from "lucide-react";
import { useRouter } from "next/navigation";

import { useUpgradeModal } from "@/components/modals/use-upgrade-modal";
import { ToastAction } from "@/components/ui/toast";
import { publishPanel } from "@/features/panels/api/publish-panel";
import { useToast } from "@/hooks/use-toast";

export const usePublishPanel = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const upgrade = useUpgradeModal();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (id) => {
      const response = await publishPanel(id);
      if (response.status === 403) {
        upgrade.onOpen();
      } else {
        toast({
          title: response.message,
          description:
            "Use this href on a link to have it trigger the panel. Ex: <a href='#hii-123456'></a>",
          action: (
            <ToastAction
              altText="Copy href"
              onClick={() =>
                navigator.clipboard.writeText(`#hii-${response.panel.id}`)
              }
            >
              <Clipboard className="mr-1 h-4 w-4" />
              Copy
            </ToastAction>
          ),
        });
        router.push(`/workspace/${response.domainId}/panels`);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast({ title: "Something went wrong.", variant: "destructive" });
    },
  });

  return mutation;
};
