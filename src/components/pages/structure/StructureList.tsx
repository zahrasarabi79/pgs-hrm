'use client';
import { FC } from 'react';
import { MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import StructureListContent from '@/components/pages/structure/StructureListContent';
import Link from 'next/link';

interface StructureListProps {}
const StructureList: FC<StructureListProps> = () => {
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title=" ساختار "
      action={
        <Link href={'add-structure'}>
          <Button variant="contained" color="primary">
            ایجاد
          </Button>
        </Link>
      }
      divider={true}
    >
      <StructureListContent />
    </MainCard>
  );
};

export default StructureList;
