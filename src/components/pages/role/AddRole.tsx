'use client';
import { useRouter } from 'next/navigation';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import RoleModifierForm from '@/components/forms/role-modifier/RoleModifierForm';

const AddRole = () => {
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
      title="ایجاد نقش"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <RoleModifierForm mode="create" />
    </MainCard>
  );
};
export default AddRole;
