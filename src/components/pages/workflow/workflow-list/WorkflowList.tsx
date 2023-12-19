'use client';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import WorkflowListContent from '@/components/pages/workflow/workflow-list/WorkflowListContent';
import { hasPermission } from '@/public/utility-functions';
import { useAppSelector } from '@/state-management/store/store';
import Link from 'next/link';

const WorkflowList = () => {
  const { allDataPermissions: permissions } = useAppSelector((state) => state.workflow);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="فرایند"
      action={
        hasPermission(permissions, 'create') && (
          <Link href={'add-workflow'}>
            <Button variant="contained" color="primary">
              ایجاد
            </Button>
          </Link>
        )
      }
      divider={true}
    >
      <WorkflowListContent />
    </MainCard>
  );
};
export default WorkflowList;
