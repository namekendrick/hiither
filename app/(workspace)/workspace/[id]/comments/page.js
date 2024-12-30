"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { COMMENTS_PER_PAGE } from "@/constants/pagination";
import { commentColumns } from "@/features/comments/components/columns";
import { CommentsTable } from "@/features/comments/components/comments-table";
import { useChangeStatusModal } from "@/features/comments/hooks/use-change-status-modal";
import { useGetComments } from "@/features/comments/hooks/use-comments";
import { useDomainId } from "@/features/domains/hooks/use-domain-id";

const CommentsPage = () => {
  const domainId = useDomainId();
  const queryClient = useQueryClient();
  const openChangeStatusModal = useChangeStatusModal((state) => state.onOpen);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pagesize: COMMENTS_PER_PAGE,
  });

  const { data, isLoading } = useGetComments(
    domainId,
    pagination.pageIndex + 1,
  );

  const columns = commentColumns({ openChangeStatusModal });

  useEffect(() => {
    if (!isLoading)
      queryClient.invalidateQueries({ queryKey: ["workspaceComments"] });
  }, [isLoading, pagination]);

  if (isLoading) return null;

  return (
    <div className="z-10 mt-[25px] flex flex-col gap-4 bg-white pb-5">
      <CommentsTable
        columns={columns}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default CommentsPage;
