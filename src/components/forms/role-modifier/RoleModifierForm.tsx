import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import OrganizationLevelField from '@/components/forms/role-modifier/OrganizationLevelField';
import { useForm } from 'react-hook-form';
import { RoleModifierFormProps, RoleModifierFormValues } from '@/types/component-types';
import StructureTreeField from '@/components/forms/role-modifier/StructureTreeField';
import { useAddRoleMutation, useUpdateRoleMutation } from '@/state-management/apis/roleApi';
import { FC, useEffect, useMemo } from 'react';
import { StructuresTreeData } from '@/state-management/apis/types';
import { getFlattenTreeData } from '@/components/pages/structure/StructureModifier/utils';
import { useGetStructureTreeQuery } from '@/state-management/apis/structureApi';
import { useRouter } from 'next/navigation';

const RoleModifierForm: FC<RoleModifierFormProps> = ({ mode, roleId, roleData }) => {
  const router = useRouter();
  const { register, control, handleSubmit, watch, formState, setValue, reset } =
    useForm<RoleModifierFormValues>();

  const [addRole, { isLoading: addRoleLoading }] = useAddRoleMutation();
  const [updateRole, { isLoading: updateRoleLoading, isSuccess }] = useUpdateRoleMutation();

  const { data: structureTreeData } = useGetStructureTreeQuery();

  const flattenedData = useMemo(() => {
    return getFlattenTreeData(
      structureTreeData?.data as StructuresTreeData[],
      Number.MAX_SAFE_INTEGER,
      undefined,
      false,
    );
  }, [structureTreeData]);

  useEffect(() => {
    // back-end does not send response for patch request
    // this is why we cant check the success from response in submit functions
    isSuccess && router.replace('/employee-management/role-list');
  }, [isSuccess, router]);

  const submit = async (data: RoleModifierFormValues) => {
    if (mode === 'update' && roleId) {
      await updateRole({
        positionId: data.positionId[0]?.id,
        rank: data.rank,
        requiredEmployeesCount: data.requiredEmployeesCount,
        description: data.description ? { _: 'StaticText', value: data.description } : undefined,
        organizationalStructureId: data.organizationalStructureId[0]?.id,
        id: roleId,
      }).unwrap();
    } else {
      const res = await addRole({
        positionId: data.positionId[0]?.id,
        rank: data.rank,
        requiredEmployeesCount: data.requiredEmployeesCount,
        description: data.description ? { _: 'StaticText', value: data.description } : undefined,
        organizationalStructureId: data.organizationalStructureId[0]?.id,
      }).unwrap();
      res.success && reset();
    }
  };

  useEffect(() => {
    if (mode === 'update' && roleData && flattenedData) {
      const selectedOrganizationalStructure = flattenedData.find(
        (item) => item.id === roleData.organizationalStructureId,
      );
      setValue('rank', roleData.rank);
      setValue('description', roleData.description?.value as unknown as string);
      setValue('requiredEmployeesCount', roleData.requiredEmployeesCount);
      setValue('positionId', [{ label: roleData.positionName.value, id: roleData.positionId }]);
      setValue('organizationalStructureId', [selectedOrganizationalStructure] as {
        id: string;
        label: string;
      }[]);
    }
  }, [roleData, mode, setValue, flattenedData]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item sm={4} xs={12}>
          <OrganizationLevelField
            register={register}
            formSubmitted={formState.isSubmitSuccessful}
            watch={watch}
            errors={Boolean(formState.errors.positionId?.message)}
            setValue={setValue}
            control={control}
            errorMessage={formState.errors.positionId?.message as string}
          />
        </Grid>
        <Grid item sm={8} xs={12}>
          <StructureTreeField
            register={register}
            formSubmitted={formState.isSubmitSuccessful}
            dataList={flattenedData}
            watch={watch}
            errors={Boolean(formState.errors.organizationalStructureId?.message)}
            setValue={setValue}
            control={control}
            errorMessage={formState.errors.organizationalStructureId?.message as string}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            type="number"
            fullWidth
            label="رتبه *"
            inputProps={{ max: 999 }}
            {...register('rank', { required: 'این فیلد الزامی است' })}
            error={Boolean(formState.errors.rank?.message)}
            helperText={Boolean(formState.errors.rank?.message) && formState.errors.rank?.message}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            fullWidth
            label="تعداد *"
            type="number"
            inputProps={{ max: 999 }}
            {...register('requiredEmployeesCount', { required: 'این فیلد الزامی است' })}
            error={Boolean(formState.errors.requiredEmployeesCount?.message)}
            helperText={
              Boolean(formState.errors.requiredEmployeesCount?.message) &&
              formState.errors.requiredEmployeesCount?.message
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={6}
            inputProps={{
              maxLength: 200,
            }}
            label="توضیحات"
            {...register('description')}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'end' }}>
          <Button
            endIcon={
              (addRoleLoading || updateRoleLoading) && (
                <CircularProgress size={12} color="primary" />
              )
            }
            variant="contained"
            type="submit"
            disabled={addRoleLoading || updateRoleLoading || !formState.isDirty}
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default RoleModifierForm;
