import React from 'react';
import WorkflowStatusListTable from '@/components/tables/WorkflowStatusListTable';
import { useSearchParams } from 'next/navigation';
import { useGetAllWorkflowStatusesQuery } from '@/state-management/apis/workflowApi';
import { WorkflowStatusTableHeadItems } from '@/public/data/tableHeaderData';
import { LoadingPage, NotFoundBox, Table } from '@/components/shared';

const WorkflowStatusListContent = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { data, isLoading, isFetching, refetch } = useGetAllWorkflowStatusesQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !data?.data?.length ? (
        <NotFoundBox title="در حال حاضر  وضعیتی وجود ندارد" />
      ) : (
        <Table tableHeadItems={WorkflowStatusTableHeadItems} total={data?.total}>
          {data?.data?.map((status, index: number) => (
            <WorkflowStatusListTable
              key={index}
              item={status}
              index={index}
              page={page}
              refetch={refetch}
            />
          ))}
        </Table>
      )}
    </>
  );
};

export default WorkflowStatusListContent;
