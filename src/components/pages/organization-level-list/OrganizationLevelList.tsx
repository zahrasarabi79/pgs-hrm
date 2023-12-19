'use client';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import OrganizationLevelListContent from '@/components/pages/organization-level-list/OrganizationLevelListContent';
import { IPermissions, hasPermission } from '@/public/utility-functions';
import { useAppSelector } from '@/state-management/store/store';
import Link from 'next/link';

const OrganizationLevelList = () => {
  const { allDataPermissions: permissions } = useAppSelector(
    (state) => state.organizationLevelName,
  );
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="سمت سازمانی"
      action={
        hasPermission(permissions as IPermissions, 'create') && (
          <Link href={'add-organization-level'}>
            <Button variant="contained" color="primary">
              ایجاد
            </Button>
          </Link>
        )
      }
      divider={true}
    >
      <OrganizationLevelListContent />
    </MainCard>
  );
};
export default OrganizationLevelList;
