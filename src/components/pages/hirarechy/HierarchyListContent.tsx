import React from 'react';
import { useGetHierarchiesQuery } from '@/state-management/apis/hierarchyApi';
import { LoadingPage, Table, NotFoundBox } from '@/components/shared';
import { hierarchyTableHeadItems } from '@/public/data/tableHeaderData';
import HierarchiesTableBody from '@/components/tables/HierarchiesTableBody';
import { useSearchParams } from 'next/navigation';

const HierarchyListContent = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const {
    data: hierarchiesData,
    isLoading,
    isFetching,
    refetch,
  } = useGetHierarchiesQuery(page, { refetchOnMountOrArgChange: true });
  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !hierarchiesData?.data?.length ? (
        <NotFoundBox title="در حال حاضر سلسله مراتبی وجود ندارد" />
      ) : (
        <Table tableHeadItems={hierarchyTableHeadItems} total={hierarchiesData?.total}>
          {hierarchiesData?.data?.map((hierarchy, index: number) => (
            <HierarchiesTableBody
              item={hierarchy}
              key={index}
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

export default HierarchyListContent;
