'use client';
import HierarchyModifier from '@/components/pages/hirarechy/HierarchyModifier';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const AddHierarchy = () => {
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
      title="ایجاد سلسله مراتب"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <HierarchyModifier mode="create" />
    </MainCard>
  );
};
export default AddHierarchy;
