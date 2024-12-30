"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { ToastAction } from "@/components/ui/toast";
import { PANELS_PER_PAGE } from "@/constants/pagination";
import { useDomainId } from "@/features/domains/hooks/use-domain-id";
import { panelColumns } from "@/features/panels/components/columns";
import { PanelTable } from "@/features/panels/components/panel-table";
import { useDeletePanelModal } from "@/features/panels/components/modals/use-delete-panel-modal";
import { useUnpublishPanelModal } from "@/features/panels/components/modals/use-unpublish-panel-modal";
import { useGetPanels } from "@/features/panels/hooks/use-get-panels";
import { useToast } from "@/hooks/use-toast";

const PanelsPage = () => {
  const domainId = useDomainId();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const openDeleteModal = useDeletePanelModal((state) => state.onOpen);
  const openUnpublishModal = useUnpublishPanelModal((state) => state.onOpen);
  const [renamingPanel, setRenamingPanel] = useState();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pagesize: PANELS_PER_PAGE,
  });

  const { data, isLoading } = useGetPanels(domainId, pagination.pageIndex + 1);

  const columns = panelColumns({
    openUnpublishModal,
    openDeleteModal,
    renamingPanel,
    setRenamingPanel,
    ToastAction,
    toast,
  });

  useEffect(() => {
    if (!isLoading) {
      queryClient.invalidateQueries({ queryKey: ["panels"] });
    }
  }, [isLoading, pagination]);

  if (isLoading) return null;

  return (
    <div className="mt-[25px] flex flex-col gap-4 pb-5">
      <PanelTable
        columns={columns}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default PanelsPage;
