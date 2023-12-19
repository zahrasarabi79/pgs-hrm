import React, { useId } from 'react';
import { LoadingPage, NotFoundBox, Table } from '@/components/shared';
import { useSearchParams } from 'next/navigation';
import { useGetOrganizationLevelsQuery } from '@/state-management/apis/organizationLevelApi';
import { organizationLevelTableHeadItems } from '@/public/data/tableHeaderData';
import OrganizationLevelTableBody from '@/components/tables/OrganizationLevelTableBody';

const OrganizationLevelListContent = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const {
    data: organizationLevelsData,
    isLoading,
    isFetching,
  } = useGetOrganizationLevelsQuery(page);

  const id = useId();

  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !organizationLevelsData?.data?.length ? (
        <NotFoundBox title="در حال حاضر سمت سازمانی وجود ندارد" />
      ) : (
        <Table
          tableHeadItems={organizationLevelTableHeadItems}
          total={organizationLevelsData?.total}
        >
          {organizationLevelsData?.data?.map((organizationLevel, index: number) => (
            <OrganizationLevelTableBody key={id} items={organizationLevel} index={index} />
          ))}
        </Table>
      )}
    </>
  );
};
export default OrganizationLevelListContent;
