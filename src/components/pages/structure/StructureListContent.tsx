import React from 'react';
import { useGetStructuresQuery } from '@/state-management/apis/structureApi';
import { LoadingPage, Table, NotFoundBox } from '@/components/shared';
import { structuresTableHeadItems } from '@/public/data/tableHeaderData';
import { useSearchParams } from 'next/navigation';
import StructuresTableBody from '@/components/tables/StructuresTableBody';

const StructureListContent = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const {
    data: structuresData,
    isLoading,
    isFetching,
    refetch,
  } = useGetStructuresQuery(page, { refetchOnMountOrArgChange: true });
  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !structuresData?.data?.length ? (
        <NotFoundBox title="در حال حاضر  ساختاری وجود ندارد" />
      ) : (
        <Table tableHeadItems={structuresTableHeadItems} total={structuresData?.total}>
          {structuresData?.data?.map((structure, index: number) => (
            <StructuresTableBody
              key={index}
              item={structure}
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

export default StructureListContent;
