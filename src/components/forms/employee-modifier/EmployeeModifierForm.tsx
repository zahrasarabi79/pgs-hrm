import { FC, useEffect, useMemo, useState } from 'react';
import { IEmployeeFormValue } from '@/types/form-types';
import { Button, CircularProgress, Grid, Stack, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { DropzoneComponent, Select } from '@/components/shared';
import { useRouter } from 'next/navigation';
import {
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from '@/state-management/apis/employeeApi';
import { useGetRolesTreeQuery } from '@/state-management/apis/roleApi';
import { EmployeeModifierFormProp } from '@/types/component-types';
import MultiSelectAutoComplete from '@/components/shared/MultiSelectAutoComplete';
import DropzoneErrorMessage from '@/components/shared/dropzone/DropzoneErrorMessage';
import { FileWithPath } from 'react-dropzone';
import { useUploadImageMutation } from '@/state-management/apis/uploadFileApi';
import ProgressBar from '@/components/shared/ProgressBar';
import { employeeData } from '@/state-management/apis/types';
import {
  getFlattenTreeData,
  removeFileHandler,
  submitHandler,
  updateEmployeeHandler,
} from '@/components/forms/employee-modifier/utils';
import DropzoneProfileBox from '@/components/shared/dropzone/DropzoneProfileBox';

const EmployeeModifierForm: FC<EmployeeModifierFormProp> = ({ mode, employeeId, employeeData }) => {
  const router = useRouter();
  const [progress, setProgress] = useState({ percent: 0, progress: 'done' });
  const [_, setRemovedImage] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
    watch,
    formState,
    setError,
    clearErrors,
  } = useForm<IEmployeeFormValue>();

  const [addEmployee, { isLoading: addLoading }] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading: updateLoading, isSuccess }] = useUpdateEmployeeMutation();
  const { data: rolesTreeData } = useGetRolesTreeQuery();

  const flattenedRoles = useMemo(() => {
    return getFlattenTreeData(rolesTreeData?.data as any);
  }, [rolesTreeData?.data]);
  const [uploadImage] = useUploadImageMutation();
  useEffect(() => {
    updateEmployeeHandler(employeeData as employeeData, setValue, mode, flattenedRoles);
  }, [employeeData, mode, setValue, flattenedRoles]);

  useEffect(() => {
    // back-end does not send response for patch request
    // this is why we cant check the success from response in submit functions
    isSuccess && router.replace('/employee-management/employees-list');
  }, [isSuccess, router]);

  const submit = async (data: IEmployeeFormValue) => {
    await submitHandler(
      data,
      uploadImage,
      setProgress,
      mode,
      addEmployee,
      reset,
      updateEmployee,
      employeeId as string,
      router,
      setError,
    );
  };

  const removeFile = (removedFile: FileWithPath) => {
    removeFileHandler(watch, setValue, removedFile, setRemovedImage);
    clearErrors('image');
  };
  return (
    <form onSubmit={handleSubmit(submit)}>
      {
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item md={4} xs={12}>
            <TextField
              label="نام *"
              fullWidth
              {...register('name', { required: 'این فیلد الزامی است' })}
              error={Boolean(errors.name?.message)}
              helperText={Boolean(errors.name?.message) && errors.name?.message}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              label="نام خانوادگی *"
              fullWidth
              {...register('lastname', { required: 'این فیلد الزامی است' })}
              error={Boolean(errors.lastname?.message)}
              helperText={Boolean(errors.lastname?.message) && errors.lastname?.message}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <Select
              control={control}
              errors={errors}
              watch={watch}
              items={[
                { name: 'زن', value: 'female' },
                { name: 'مرد', value: 'male' },
              ]}
              name="gender"
              setValue={setValue}
              label="جنسیت *"
              size="medium"
              disabled={false}
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <MultiSelectAutoComplete
              noOptionsText="موردی یافت نشد "
              label=" نقش *"
              dataList={flattenedRoles as any}
              name="role"
              errors={Boolean(errors.role?.message)}
              errorMessage={errors.role?.message as string}
              optionName="label"
              watch={watch}
              setValue={setValue}
              register={register}
              formSubmitted={formState.isSubmitSuccessful}
              control={control}
            />
          </Grid>
          <Grid item xs={12} md={8} height={'100%'}>
            <TextField
              label="توضیحات"
              multiline
              inputProps={{
                style: {
                  height: '180px',
                },
              }}
              minRows={4}
              maxRows={6}
              fullWidth
              {...register('description')}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction={'column'} sx={{ height: '100%' }} gap={1}>
              <DropzoneProfileBox
                watch={watch}
                removeFile={removeFile}
                inputName="image"
                errors={errors}
              />
              <div style={{ height: '100%', display: 'flex' }}>
                <DropzoneComponent
                  setValue={setValue}
                  register={register}
                  watch={watch}
                  label="بارگذاری پروفایل"
                  inputName="image"
                  disabled={false}
                />
              </div>
              {progress.progress === 'uploading' && <ProgressBar progress={progress.percent} />}

              <DropzoneErrorMessage watch={watch} errors={errors} inputName="image" />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'end' }}>
            <Button
              endIcon={
                (progress.progress === 'uploading' || addLoading || updateLoading) && (
                  <CircularProgress size={12} color="primary" />
                )
              }
              type="submit"
              variant="contained"
              disabled={
                progress.progress === 'uploading' ||
                addLoading ||
                updateLoading ||
                !formState.isDirty
              }
            >
              ثبت
            </Button>
          </Grid>
        </Grid>
      }
    </form>
  );
};
export default EmployeeModifierForm;
