'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import EmployeeModifierForm from '@/components/forms/employee-modifier/EmployeeModifierForm';

const AddEmployee = () => {
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
      title=" ایجاد کارمند"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <EmployeeModifierForm mode={'create'} />
    </MainCard>
  );
};

export default AddEmployee;
