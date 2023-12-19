'use client';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import HierarchyListContent from '@/components/pages/hirarechy/HierarchyListContent';
import { hasPermission } from '@/public/utility-functions';
import { useAppSelector } from '@/state-management/store/store';
import Link from 'next/link';

const HierarchyList = () => {
  const { allDataPermissions: permissions } = useAppSelector((state) => state.hierarchySlice);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title=" سلسله مراتب"
      action={
        hasPermission(permissions, 'create') && (
          <Link href={'add-hierarchy'}>
            <Button variant="contained" color="primary">
              ایجاد
            </Button>
          </Link>
        )
      }
      divider={true}
    >
      <HierarchyListContent />
    </MainCard>
  );
};
export default HierarchyList;
