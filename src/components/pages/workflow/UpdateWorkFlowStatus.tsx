import React, { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { MainCard, NotAccessBox } from '@/components/shared';
import { Button } from '@mui/material';
import WorkflowStatusModifierForm from '@/components/forms/WorkflowStatusModifierForm';
import { useGetWorkflowStatusQuery } from '@/state-management/apis/workflowApi';
import Loading from '@/components/shared/Loading';
import { hasPermission } from '@/public/utility-functions';
import { useAppSelector } from '@/state-management/store/store';

interface UpdateWorkFlowStatusProps {}

const UpdateWorkFlowStatus: FC<UpdateWorkFlowStatusProps> = () => {
  const router = useRouter();
  const { workflowStatusId } = useParams();
  const { data, isLoading } = useGetWorkflowStatusQuery(workflowStatusId as string, {
    refetchOnMountOrArgChange: true,
  });
  const { singleItemPermissions: permissions } = useAppSelector(
    (state) => state.workflowStatusSlice,
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
      title=" ویرایش وضعیت جریان کار "
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <Loading height="60vh" />
      ) : hasPermission(permissions, 'update') ? (
        <WorkflowStatusModifierForm
          mode={'update'}
          workflowStatusId={workflowStatusId as string}
          data={data}
        />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};

export default UpdateWorkFlowStatus;
