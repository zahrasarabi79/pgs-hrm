'use client';
import { useParams, useRouter } from 'next/navigation';
import { LoadingPage, MainCard } from '@/components/shared';
import { Button } from '@mui/material';
import UserModifierForm from '@/components/forms/UserModifierForm';
import { useGetUserAccountQuery } from '@/state-management/apis/userApi';

const User = () => {
  const router = useRouter();
  const { userId } = useParams();
  const { data, isLoading, isSuccess } = useGetUserAccountQuery(userId as string);
  const userExist = data; // not undefined

  return (
    <MainCard
      cardStyles={{
        px: 2,
        pb: 2,
        borderRadius: '16px',
        height: '80vh',
        position: 'relative',
      }}
      title={isLoading ? '' : userExist ? 'ویرایش کاربر' : 'افزودن کاربر'}
      action={
        <Button onClick={() => router.back()} variant="contained" color="primary">
          بازگشت
        </Button>
      }
      divider={true}
    >
      {isLoading ? (
        <LoadingPage height="60vh" />
      ) : (
        <UserModifierForm userAccount={data} isSuccess={isSuccess} />
      )}
    </MainCard>
  );
};

export default User;
