'use client';
import StructureModifier from '@/components/pages/structure/StructureModifier/StructureModifier';
import { MainCard, NotAccessBox } from '@/components/shared';
import { Button } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useGetStructureQuery } from '@/state-management/apis/structureApi';
import Loading from '@/components/shared/Loading';
import { hasPermission } from '@/public/utility-functions';
import { useAppSelector } from '@/state-management/store/store';

const UpdateStructure = () => {
  const router = useRouter();
  const { structureId } = useParams();
  const { data: structureData, isLoading } = useGetStructureQuery(structureId as string, {
    refetchOnMountOrArgChange: true,
  });
  const { singleItemPermissions: permissions } = useAppSelector((state) => state.structureApi);

  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title=" ویرایش ساختار "
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <Loading height={'60vh'} />
      ) : hasPermission(permissions, 'update') ? (
        <StructureModifier
          mode="update"
          StructureId={structureId as string}
          structureData={structureData}
        />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};
export default UpdateStructure;
