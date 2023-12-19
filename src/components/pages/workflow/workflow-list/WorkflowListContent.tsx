import { useSearchParams } from 'next/navigation';
import { useGetWorkflowsQuery } from '@/state-management/apis/workflowApi';
import { LoadingPage, NotFoundBox, Table } from '@/components/shared';
import React from 'react';
import WorkflowListTableBody from '@/components/tables/WorkflowListTableBody';
import { WorkflowTableHeadItems } from '@/public/data/tableHeaderData';

const WorkflowListContent = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { data, isLoading, isFetching } = useGetWorkflowsQuery(page, {
    refetchOnMountOrArgChange: true,
  });
  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !data?.data?.length ? (
        <NotFoundBox title="در حال حاضر فرایندی وجود ندارد" />
      ) : (
        <Table tableHeadItems={WorkflowTableHeadItems} total={data?.total}>
          {data?.data?.map((item: any, index: number) => (
            <WorkflowListTableBody key={index} item={item} index={index} page={page} />
          ))}
        </Table>
      )}
    </>
  );
};
export default WorkflowListContent;
