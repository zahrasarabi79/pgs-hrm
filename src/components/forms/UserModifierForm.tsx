import React, { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { useCreateUserMutation, useUpdateUserMutation } from '@/state-management/apis/userApi';
import { validatePassword, validateUsername } from '@/components/forms/utils';
import { useParams, useRouter } from 'next/navigation';
import { IUserFormValues } from '@/types/form-types';
import { UserModifierFormProps } from '@/types/component-types';
import { Icon } from '@/components/shared';

const UserModifierForm: FC<UserModifierFormProps> = ({ isSuccess, userAccount }) => {
  const { userId } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
    watch,
  } = useForm<IUserFormValues>({ mode: 'onChange' });

  const [showPassword, setShowPassword] = useState({
    password: false,
    repeat: false,
  });
  const handleClickShowPassword = (inputName: string) => {
    inputName === 'repeat'
      ? setShowPassword({ ...showPassword, repeat: !showPassword.repeat })
      : setShowPassword({ ...showPassword, password: !showPassword.password });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [createUser, { isLoading: createLoading, isSuccess: createSuccess }] =
    useCreateUserMutation();
  const [updateUser, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateUserMutation();

  const userFound: boolean = isSuccess === true;

  useEffect(() => {
    if (userFound && userAccount) {
      setValue('username', userAccount.data.username);
      setValue('email', userAccount.data.email);
    }
  }, [userFound, userAccount, setValue]);

  useEffect(() => {
    (createSuccess || updateSuccess) && router.back();
  }, [createSuccess, updateSuccess, router]);

  const submit = (data: IUserFormValues) => {
    const { email, password, username } = data;
    if (userAccount?.success === true) {
      // user exist and we update user
      updateUser({
        body: { username, password, email },
        employeeId: userId as string,
      }).unwrap();
    } else {
      // user doesn't exist and we create user
      createUser({
        body: { username, password, email },
        employeeId: userId as string,
      }).unwrap();
    }
  };
  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      <Grid container columnGap={8} rowGap={2} sx={{ mt: 3 }}>
        <Grid item md={4} xs={12}>
          <TextField
            label="نام کاربری *"
            autoComplete="off"
            inputProps={{
              autoComplete: 'new-password',
            }}
            type="text"
            fullWidth
            {...register('username', {
              required: 'این فیلد الزامی است',
              validate: (value: string) => {
                const usernameValidationResult = validateUsername(value);
                if (usernameValidationResult !== true) {
                  return usernameValidationResult;
                }
              },
            })}
            error={Boolean(errors.username?.message)}
            helperText={Boolean(errors.username?.message) ? errors.username?.message : ' '}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            type="email"
            inputProps={{
              autoComplete: 'new-password',
            }}
            autoComplete="off"
            label="ایمیل *"
            fullWidth
            {...register('email', { required: 'این فیلد الزامی است' })}
            error={Boolean(errors.email?.message)}
            helperText={Boolean(errors.email?.message) ? errors.email?.message : ' '}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            type={showPassword.password ? 'text' : 'password'}
            label={userFound ? 'رمز عبور  ' : 'تکرار رمز عبور  *'}
            autoComplete="off"
            InputProps={{
              autoComplete: 'new-password',
              endAdornment: (
                <IconButton
                  onClick={() => handleClickShowPassword('password')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  role="icon-button"
                >
                  {showPassword.password ? (
                    <Icon pathName="bold/eye.svg" />
                  ) : (
                    <Icon pathName="bold/eye-slash.svg" />
                  )}
                </IconButton>
              ),
            }}
            fullWidth
            {...register('password', {
              ...(userFound ? {} : { required: 'این فیلد الزامی است' }), // in update user the password changing is optioanl
              validate: (value) => {
                if (userFound) return true; // in update user there no validation
                else {
                  const passwordValidationResult = validatePassword(value);
                  if (passwordValidationResult !== true) {
                    return passwordValidationResult;
                  }
                  if (value !== watch('repeatPassword') && watch('repeatPassword')) {
                    return 'رمز عبور با تکرار رمز عبور مطابقت ندارد';
                  }
                  return true;
                }
              },
            })}
            error={Boolean(errors.password?.message)}
            helperText={Boolean(errors.password?.message) ? errors.password?.message : ' '}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <TextField
            type={showPassword.repeat ? 'text' : 'password'}
            label={userFound ? 'تکرار رمز عبور  ' : 'تکرار رمز عبور  *'}
            fullWidth
            {...register('repeatPassword', {
              ...(userFound ? {} : { required: 'این فیلد الزامی است' }), // in update user the password changing is optioanl
              validate: (value) => {
                //in update user theres no validation
                if (userFound) true;
                else {
                  if (value !== watch('password')) {
                    return ' تکرار رمز عبور مطابقت ندارد';
                  }
                  return true;
                }
              },
            })}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => handleClickShowPassword('repeat')}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  role="icon-button"
                >
                  {showPassword.repeat ? (
                    <Icon pathName="bold/eye.svg" />
                  ) : (
                    <Icon pathName="bold/eye-slash.svg" />
                  )}
                </IconButton>
              ),
            }}
            error={Boolean(errors.repeatPassword?.message)}
            helperText={
              Boolean(errors.repeatPassword?.message) ? errors.repeatPassword?.message : ' '
            }
          />
        </Grid>

        <Grid item xs={12} sx={{ textAlign: 'end' }}>
          <Button
            endIcon={
              (createLoading || updateLoading) && <CircularProgress size={12} color="primary" />
            }
            disabled={createLoading || updateLoading || !formState.isDirty}
            color="success"
            type="submit"
            variant="contained"
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserModifierForm;
