import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCreatePanelModal } from "@/features/panels/components/modals/use-create-panel-modal";

export const CreatePanelButton = ({ domainId }) => {
  const openModal = useCreatePanelModal((state) => state.onOpen);

  return (
    <Button onClick={() => openModal(domainId)}>
      <Plus className="mr-1 h-5 w-5" />
      <span className="font-semibold">Create panel</span>
    </Button>
  );
};
