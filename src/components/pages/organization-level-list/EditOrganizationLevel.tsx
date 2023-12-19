'use client';
import { LoadingPage, MainCard, NotAccessBox } from '@/components/shared';
import { Button } from '@mui/material';
import OrganizationLevelModifierForm from '@/components/forms/OrganizationLevelModifierForm';
import { useParams, useRouter } from 'next/navigation';
import { useGetOrganizationLevelQuery } from '@/state-management/apis/organizationLevelApi';
import { IPermissions, hasPermission } from '@/public/utility-functions';

const EditOrganizationLevel = () => {
  const router = useRouter();
  const { organizationLevelId } = useParams();
  const { data, isLoading } = useGetOrganizationLevelQuery(organizationLevelId as string, {});
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="ویرایش سمت سازمانی"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <LoadingPage height="60vh" />
      ) : hasPermission(data?.permissions as IPermissions, 'update') ? (
        <OrganizationLevelModifierForm
          mode="update"
          organizationLevelId={organizationLevelId as string}
          organizationData={data}
        />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};
export default EditOrganizationLevel;
