'use client';
import { useRouter } from 'next/navigation';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import AccessLevelForm from '@/components/forms/role-modifier/AccessLevelForm';

const AccessLevel = () => {
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
      title="دسترسی"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <AccessLevelForm />
    </MainCard>
  );
};
export default AccessLevel;
