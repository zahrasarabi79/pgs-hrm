'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { MainCard } from '@/components/shared';
import WorkflowPreviewContent from '@/components/pages/workflow/WorkflowPreviewContent';

const PreviewWorkflowStatus = () => {
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
      <WorkflowPreviewContent />
    </MainCard>
  );
};

export default PreviewWorkflowStatus;
