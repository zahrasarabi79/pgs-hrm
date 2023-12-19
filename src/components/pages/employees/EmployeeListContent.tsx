import React, { FC } from 'react';
import { LoadingPage, NotFoundBox, Table } from '@/components/shared';
import { EmployeesTableHeadItems } from '@/public/data/tableHeaderData';
import { useSearchParams } from 'next/navigation';
import { useGetEmployeesQuery } from '@/state-management/apis/employeeApi';
import EmployeesTableBody from '@/components/tables/EmployeeTableBody';

interface EmployeeListContentProps {}

const EmployeeListContent: FC<EmployeeListContentProps> = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data: employeesData, isLoading, isFetching, refetch } = useGetEmployeesQuery(page);
  return (
    <>
      {isLoading || isFetching ? (
        <LoadingPage height="60vh" />
      ) : !employeesData?.data?.length ? (
        <NotFoundBox title="در حال حاضر کارمندی وجود ندارد" />
      ) : (
        <Table tableHeadItems={EmployeesTableHeadItems} total={employeesData?.total}>
          {employeesData?.data?.map((employees, index: number) => (
            <EmployeesTableBody
              item={employees}
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

export default EmployeeListContent;
