'use client';
import { useParams, useRouter } from 'next/navigation';
import { MainCard, NotAccessBox } from '@/components/shared';
import { Button } from '@mui/material';
import RoleModifierForm from '@/components/forms/role-modifier/RoleModifierForm';
import { useGetRoleQuery } from '@/state-management/apis/roleApi';
import Loading from '@/components/shared/Loading';
import { hasPermission, IPermissions } from '@/public/utility-functions';
import { OneRoleRes } from '@/state-management/apis/types';

const EditRole = () => {
  const router = useRouter();
  const { roleId } = useParams();
  const { data, isLoading } = useGetRoleQuery(roleId as string);
  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title="ویرایش نقش"
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <Loading height={'60vh'} />
      ) : hasPermission(data?.permissions as IPermissions, 'update') ? (
        <RoleModifierForm
          mode="update"
          roleId={roleId as string}
          roleData={data?.data as OneRoleRes['data']}
        />
      ) : (
        <NotAccessBox />
      )}
    </MainCard>
  );
};
export default EditRole;
