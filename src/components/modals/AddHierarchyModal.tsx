import React from 'react';
import { Button, CircularProgress, Grid, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useAddHierarchyMutation } from '@/state-management/apis/hierarchyApi';
import { AddHierarchyReq } from '@/state-management/apis/types';
import { setCloseModal } from '@/state-management/slices/modalSlice';
import { useAppDispatch } from '@/state-management/store/store';

const AddHierarchyModal = () => {
  interface HierarchyModifierFormValues {
    name: string;
    rank: number;
  }
  const [addHierarchy, { isLoading: createLoading }] = useAddHierarchyMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HierarchyModifierFormValues>({ mode: 'onChange' });
  const dispatch = useAppDispatch();
  const submit = async (data: HierarchyModifierFormValues) => {
    const { name, rank } = data;
    const body = {
      name: {
        _: 'StaticText',
        value: name,
      },
      rank,
    } as AddHierarchyReq;
    await addHierarchy(body).unwrap();
    reset();
  };

  const handleCloseModal = () => {
    dispatch(setCloseModal());
  };
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2} justifyContent={'end'}>
          <Grid item xs={12} md={6}>
            <TextField
              label="نام *"
              fullWidth
              variant="outlined"
              type="text"
              inputProps={{
                maxLength: 20,
              }}
              error={Boolean(errors.name?.message)}
              helperText={Boolean(errors.name?.message) && errors.name?.message}
              {...register('name', {
                required: 'این فیلد الزامی است',
              })}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="رتبه *"
              fullWidth
              max={999}
              variant="outlined"
              type="number"
              error={Boolean(errors.rank?.message)}
              helperText={Boolean(errors.rank?.message) && errors.rank?.message}
              {...register('rank', {
                required: 'این فیلد الزامی است',
                max: {
                  value: 999,
                  message: 'تعداد کاراکترهای وارد شده نمی‌تواند از ۹۹۹ تا بیشتر باشد',
                },
              })}
            />
          </Grid>

          <Grid display={'flex'} item xs={12} justifyContent={'center'}>
            <Stack alignItems={'center'} justifyContent={'space-between'} direction={'row'} gap={2}>
              <Button
                endIcon={createLoading && <CircularProgress size={12} color="primary" />}
                fullWidth
                disabled={createLoading}
                variant="contained"
                color="primary"
                type="submit"
              >
                ثبت
              </Button>
              <Button
                fullWidth
                disabled={createLoading}
                variant="contained"
                color="error"
                onClick={handleCloseModal}
              >
                انصراف
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default AddHierarchyModal;
