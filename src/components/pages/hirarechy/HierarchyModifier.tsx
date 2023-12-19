import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  useAddHierarchyMutation,
  useUpdateHierarchyMutation,
} from '@/state-management/apis/hierarchyApi';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { AddHierarchyReq } from '@/state-management/apis/types';
import { useRouter } from 'next/navigation';
import { HierarchyModifierProps } from '@/types/component-types';
interface HierarchyModifierFormValues {
  name: string;
  rank: number;
  description: string;
}
const HierarchyModifierForm: FC<HierarchyModifierProps> = ({
  mode,
  hierarchyId,
  hierarchyData,
}) => {
  const [addHierarchy, { isLoading: createLoading }] = useAddHierarchyMutation();
  const [updateHierarchy, { isLoading: UpdateLoading, isSuccess }] = useUpdateHierarchyMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    formState,
    watch,
  } = useForm<HierarchyModifierFormValues>({ mode: 'onChange' });
  const router = useRouter();
  useEffect(() => {
    if (mode === 'update' && hierarchyData) {
      const formValues = {
        name: hierarchyData.data.name.value,
        rank: hierarchyData.data.rank,
        description: hierarchyData.data.description?.value ?? '',
      };
      reset(formValues);
    }
  }, [hierarchyData, setValue, mode, reset]);

  useEffect(() => {
    // back-end does not send response for patch request
    // this is why we cant check the success from response in submit functions
    isSuccess && router.replace('/management-of-organizational-structure/hierarchy-list');
  }, [isSuccess, router]);

  const submit = async (data: HierarchyModifierFormValues) => {
    const { name, rank, description } = data;
    const body = {
      name: {
        _: 'StaticText',
        value: name,
      },
      description: {
        _: 'StaticText',
        value: description,
      },
      rank,
    } as AddHierarchyReq;
    if (mode === 'create') {
      const res = await addHierarchy(body).unwrap();
      res.success && reset();
    }
    if (mode === 'update') {
      await updateHierarchy({ ...body, id: hierarchyId as string }).unwrap();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Grid container spacing={2} justifyContent={'end'}>
          <Grid item xs={12} md={6}>
            <TextField
              label="نام *"
              fullWidth
              variant="outlined"
              type="text"
              inputProps={{
                maxLength: 50,
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
              min={1}
              max={999}
              variant="outlined"
              type="number"
              error={Boolean(errors.rank?.message)}
              helperText={Boolean(errors.rank?.message) && errors.rank?.message}
              {...register('rank', {
                required: 'این فیلد الزامی است',

                min: {
                  value: 1,
                  message: 'حداقل ورودی مجاز یک می باشد',
                },
                max: {
                  value: 999,
                  message: 'تعداد کاراکترهای وارد شده نمی‌تواند از ۹۹۹ تا بیشتر باشد',
                },
              })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="توضیحات"
              fullWidth
              multiline
              maxRows={3}
              variant="outlined"
              type="text"
              value={watch('description') || ' '}
              inputProps={{
                maxLength: 200,
                style: {
                  height: 82,
                },
              }}
              error={Boolean(errors.description?.message)}
              helperText={Boolean(errors.description?.message) && errors.description?.message}
              {...register('description', {})}
            />
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              endIcon={
                createLoading || (UpdateLoading && <CircularProgress size={12} color="primary" />)
              }
              fullWidth
              disabled={createLoading || UpdateLoading || !formState.isDirty}
              variant="contained"
              color="primary"
              type="submit"
            >
              ثبت
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default HierarchyModifierForm;
