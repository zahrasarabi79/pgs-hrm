'use client';
import StructureModifier from '@/components/pages/structure/StructureModifier/StructureModifier';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const AddStructure = () => {
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
      title="ایجاد  ساختار"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      <StructureModifier mode="create" />
    </MainCard>
  );
};
export default AddStructure;
