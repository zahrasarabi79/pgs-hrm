'use client';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import WorkflowStatusModifierForm from '@/components/forms/WorkflowStatusModifierForm';

interface AddWorkflowStatusProps {}

const AddWorkflowStatus: FC<AddWorkflowStatusProps> = () => {
  const router = useRouter();
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
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <WorkflowStatusModifierForm mode={'create'} />
    </MainCard>
  );
};

export default AddWorkflowStatus;
