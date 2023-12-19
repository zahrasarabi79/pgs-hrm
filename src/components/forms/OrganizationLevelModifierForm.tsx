import { FC, useEffect } from 'react';
import {
  IOrganizationLevelFormValue,
  OrganizationLevelModifierFormProps,
} from '@/types/component-types';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import {
  useAddOrganizationLevelMutation,
  useUpdateOrganizationLevelMutation,
} from '@/state-management/apis/organizationLevelApi';
import { useRouter } from 'next/navigation';

const OrganizationLevelModifierForm: FC<OrganizationLevelModifierFormProps> = ({
  mode,
  organizationLevelId,
  organizationData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
    reset,
  } = useForm<IOrganizationLevelFormValue>();

  const router = useRouter();

  const [addOrganizationLevel, { isLoading: isLoadingAdd }] = useAddOrganizationLevelMutation();
  const [updateOrganizationLevel, { isLoading: isLoadingUpdate, isSuccess }] =
    useUpdateOrganizationLevelMutation();

  useEffect(() => {
    if (mode === 'update' && organizationData?.data) {
      setValue('name', organizationData?.data.name.value);
      setValue('description', organizationData?.data.description?.value as string);
    }
  }, [organizationData?.data, mode, setValue]);

  useEffect(() => {
    // back-end does not send response for patch request
    // this is why we cant check the success from response in submit functions
    isSuccess && router.replace('/employee-management/organization-level-list');
  }, [isSuccess, router]);

  const submit = async (data: IOrganizationLevelFormValue) => {
    if (mode === 'update' && organizationLevelId) {
      await updateOrganizationLevel({
        name: { _: 'StaticText', value: data.name },
        description: data.description ? { _: 'StaticText', value: data.description } : undefined,
        id: organizationLevelId,
      }).unwrap();
    } else {
      const res = await addOrganizationLevel({
        name: { _: 'StaticText', value: data.name },
        description: { _: 'StaticText', value: data.description },
      }).unwrap();
      res.success && reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item md={6} xs={12}>
          <TextField
            label="عنوان *"
            fullWidth
            inputProps={{
              maxLength: 50,
            }}
            {...register('name', { required: 'این فیلد الزامی است' })}
            error={Boolean(errors.name?.message)}
            helperText={Boolean(errors.name?.message) && errors.name?.message}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="توضیحات"
            multiline
            minRows={4}
            maxRows={6}
            inputProps={{
              maxLength: 200,
            }}
            fullWidth
            {...register('description')}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'end' }}>
          <Button
            endIcon={
              (isLoadingAdd || isLoadingUpdate) && <CircularProgress size={12} color="primary" />
            }
            type="submit"
            variant="contained"
            disabled={isLoadingAdd || isLoadingUpdate || !formState.isDirty}
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default OrganizationLevelModifierForm;
