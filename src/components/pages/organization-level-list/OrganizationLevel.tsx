'use client';
import { useRouter } from 'next/navigation';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import OrganizationLevelModifierForm from '@/components/forms/OrganizationLevelModifierForm';

const OrganizationLevel = () => {
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
      title="ایجاد سمت سازمانی"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <OrganizationLevelModifierForm mode="create" />
    </MainCard>
  );
};
export default OrganizationLevel;
