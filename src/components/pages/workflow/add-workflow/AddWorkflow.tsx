'use client';

import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import WorkflowModifierForm from '@/components/forms/WorkflowModifierForm';

const AddWorkflow = () => {
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
      title="ایجاد فرایند"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <WorkflowModifierForm mode="create" />
    </MainCard>
  );
};

export default AddWorkflow;
