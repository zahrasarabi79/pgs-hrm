'use client';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import RoleListContent from '@/components/pages/role/RoleListContent';
import { useAppSelector } from '@/state-management/store/store';
import { hasPermission } from '@/public/utility-functions';
import Link from 'next/link';

const RoleList = () => {
  const { allDataPermissions: permissions } = useAppSelector((state) => state.roleSlice);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="نقش"
      action={
        hasPermission(permissions, 'create') && (
          <Link href={'add-role'}>
            <Button variant="contained" color="primary">
              ایجاد
            </Button>
          </Link>
        )
      }
      divider={true}
    >
      <RoleListContent />
    </MainCard>
  );
};
export default RoleList;
