import { FC } from 'react';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import WorkflowStatusListContent from '@/components/pages/workflow/WorkflowStatusListContent';
import Link from 'next/link';
import { useAppSelector } from '@/state-management/store/store';
import { hasPermission } from '@/public/utility-functions';

interface WorkflowStatusListProps {}

const WorkflowStatusList: FC<WorkflowStatusListProps> = () => {
  const { allDataPermissions: permissions } = useAppSelector((state) => state.workflowStatusSlice);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="وضعیت جریان کار"
      action={
        hasPermission(permissions, 'create') && (
          <Link href={'add-workflow-status'}>
            <Button variant="contained" color="primary">
              ایجاد
            </Button>
          </Link>
        )
      }
      divider={true}
    >
      <WorkflowStatusListContent />
    </MainCard>
  );
};

export default WorkflowStatusList;
