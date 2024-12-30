"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { PEOPLE_PER_PAGE } from "@/constants/pagination";
import { useDomainId } from "@/features/domains/hooks/use-domain-id";
import { personColumns } from "@/features/people/components/columns";
import { PeopleTable } from "@/features/people/components/people-table";
import { useChangeAccessModal } from "@/features/people/hooks/use-change-access-modal";
import { useGetPeople } from "@/features/people/hooks/use-people";

const PeoplePage = () => {
  const domainId = useDomainId();
  const queryClient = useQueryClient();
  const openChangeAccessModal = useChangeAccessModal((state) => state.onOpen);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pagesize: PEOPLE_PER_PAGE,
  });

  const { data, isLoading } = useGetPeople(domainId, pagination.pageIndex + 1);

  const columns = personColumns({ openChangeAccessModal });

  useEffect(() => {
    if (!isLoading) queryClient.invalidateQueries({ queryKey: ["people"] });
  }, [isLoading, pagination]);

  if (isLoading) return null;

  return (
    <div className="z-10 mt-[25px] flex flex-col gap-4 bg-white pb-5">
      <PeopleTable
        columns={columns}
        data={data}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};

export default PeoplePage;
