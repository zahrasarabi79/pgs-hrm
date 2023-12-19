'use client';
import HierarchyModifier from '@/components/pages/hirarechy/HierarchyModifier';
import { LoadingPage, MainCard, NotAccessBox } from '@/components/shared';
import { hasPermission } from '@/public/utility-functions';
import { useGetHierarchyQuery } from '@/state-management/apis/hierarchyApi';
import { useAppSelector } from '@/state-management/store/store';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

const UpdateHierarchy = ({ params }: { params: { hierarchyId: string } }) => {
  const router = useRouter();
  const { data: hierarchyData, isLoading } = useGetHierarchyQuery(params.hierarchyId);
  const { singleItemPermissions: permissions } = useAppSelector((state) => state.hierarchySlice);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="ویرایش سلسله مراتب"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <LoadingPage height="60vh" />
      ) : hasPermission(permissions, 'update') ? (
        <HierarchyModifier
          mode="update"
          hierarchyId={params.hierarchyId}
          hierarchyData={hierarchyData}
        />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};
export default UpdateHierarchy;
