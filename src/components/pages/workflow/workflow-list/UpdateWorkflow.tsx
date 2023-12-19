'use client';
import { useParams, useRouter } from 'next/navigation';
import { LoadingPage, MainCard, NotAccessBox } from '@/components/shared';
import { Button } from '@mui/material';
import React from 'react';
import WorkflowModifierForm from '@/components/forms/WorkflowModifierForm';
import { useGetWorkflowQuery } from '@/state-management/apis/workflowApi';
import { hasPermission, IPermissions } from '@/public/utility-functions';

const UpdateWorkflow = () => {
  const router = useRouter();
  const { workflowId } = useParams();
  const { data: workflowData, isLoading } = useGetWorkflowQuery(workflowId as string);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title=" ویرایش فرایند "
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <LoadingPage height="60vh" />
      ) : hasPermission(workflowData?.permissions as IPermissions, 'update') ? (
        <WorkflowModifierForm mode="update" workflowData={workflowData?.data} />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};
export default UpdateWorkflow;
