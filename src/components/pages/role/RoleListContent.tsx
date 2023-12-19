import React, { useId } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoadingPage, NotFoundBox, Table } from '@/components/shared';
import { roleTableHeadItems } from '@/public/data/tableHeaderData';
import { useGetRolesQuery } from '@/state-management/apis/roleApi';
import RoleTableBody from '@/components/tables/RoleTableBody';

const RoleListContent = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const { data: rolesData, isLoading, isFetching } = useGetRolesQuery(page);

  const id = useId();

  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !rolesData?.data?.length ? (
        <NotFoundBox title="در حال حاضر نقشی وجود ندارد" />
      ) : (
        <Table tableHeadItems={roleTableHeadItems} total={rolesData?.total}>
          {rolesData?.data?.map((roleData, index: number) => (
            <RoleTableBody key={id} item={roleData} index={index} />
          ))}
        </Table>
      )}
    </>
  );
};
export default RoleListContent;
