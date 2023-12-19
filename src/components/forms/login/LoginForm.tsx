import React, { useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import UsernameField from '@/components/forms/login/UsernameField';
import PasswordField from '@/components/forms/login/PasswordField';
import { useLoginMutation } from '@/state-management/apis/authApi';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export interface LoginFormValues {
  username: string;
  password: string;
}

const LoginForm = ({ setCheckedSlide }) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
    control,
    clearErrors,
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
  });

  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = () => {
    clearErrors();
  };
  const handleMouseDownUsername = () => {
    clearErrors();
  };
  useEffect(() => {
    if (isSuccess) router.replace('/workflow-management/dashboard');
  }, [isSuccess, router]);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    const { username, password } = data;
    await login({ username, password }).unwrap();
  };
  const handleSlide = (prev) => {
    setCheckedSlide(!prev);
  };
  useEffect(() => {
    if (!!data?.data?.access_token) {
      Cookies.set('access_token', data.data.access_token);
      Cookies.set('refresh_token', data.data.refresh_token);
    }
  }, [data]);

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Grid container gap={1}>
        <Grid item xs={12}>
          <UsernameField
            control={control}
            errors={errors}
            reqError={Boolean(error)}
            watch={watch}
            register={register}
            handleMouseDownUsername={handleMouseDownUsername}
          />
        </Grid>
        <Grid item xs={12}>
          <PasswordField
            watch={watch}
            register={register}
            errors={errors}
            reqError={Boolean(error)}
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{
              boxShadow: 'none',
              bgcolor: '#AEE9FF',
              color: '#1D1B1C',
              '&.Mui-disabled': { bgcolor: '#AEE9FF', color: '#1D1B1C' },
              '&:active': { boxShadow: 'none' },
              '&:hover': {
                bgcolor: '#91c0d2',
                boxShadow: 'none',
              },
            }}
            fullWidth
            onClick={handleSlide}
            color="info"
            variant="contained"
            // type="submit"
            disabled={!watch('password') || !watch('username') || isLoading}
            endIcon={isLoading && <CircularProgress color="info" size={20} />}
          >
            وارد پنل کاربری خود شوید
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
