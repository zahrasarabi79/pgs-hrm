'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { MainCard } from '@/components/shared';
import EmployeePreviewContent from '@/components/pages/employees/EmployeePreviewContent';

const PreviewEmployee = () => {
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
      title="کارمندان"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <EmployeePreviewContent />
    </MainCard>
  );
};

export default PreviewEmployee;
