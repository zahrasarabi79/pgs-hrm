'use client';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import EmployeeListContent from '@/components/pages/employees/EmployeeListContent';
import { useAppSelector } from '@/state-management/store/store';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

const EmployeesList = () => {
  const { allDataPermissions: permissions } = useAppSelector((state) => state.employeesSlice);

  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="کارمندان"
      action={
        hasPermission(permissions, 'create') && (
          <Link href={'add-employee'}>
            <Button variant="contained" color="primary">
              ایجاد
            </Button>
          </Link>
        )
      }
      divider={true}
    >
      <EmployeeListContent />
    </MainCard>
  );
};

export default EmployeesList;
