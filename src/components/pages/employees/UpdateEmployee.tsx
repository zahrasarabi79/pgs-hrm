import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { LoadingPage, MainCard, NotAccessBox } from '@/components/shared';
import { Button } from '@mui/material';
import EmployeeModifierForm from '@/components/forms/employee-modifier/EmployeeModifierForm';
import { useAppSelector } from '@/state-management/store/store';
import { useGetEmployeeQuery } from '@/state-management/apis/employeeApi';
import { hasPermission } from '@/public/utility-functions';
import { employeeData } from '@/state-management/apis/types';

const UpdateEmployee = () => {
  const router = useRouter();
  const { employeeId } = useParams();
  const { data: employeeData, isLoading } = useGetEmployeeQuery(employeeId as string);
  const { singleItemPermissions: permissions } = useAppSelector((state) => state.employeesSlice);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="ویرایش کارمند"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <LoadingPage height="60vh" />
      ) : hasPermission(permissions, 'update') ? (
        <EmployeeModifierForm
          mode={'update'}
          employeeId={employeeId as string}
          employeeData={employeeData?.data as employeeData}
        />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};

export default UpdateEmployee;
