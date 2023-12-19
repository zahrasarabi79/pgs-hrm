import { FC, useEffect } from 'react';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { Select } from '@/components/shared';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import {
  useCreateWorkflowStatusMutation,
  useUpdateWorkflowStatusMutation,
} from '@/state-management/apis/workflowApi';
import { createWorkflowStatusReq, workflowStatusRes } from '@/state-management/apis/types';
import { convertStatusToPersian } from '@/components/tables/WorkflowStatusListTable/utils';

interface WorkflowStatusModifierFormProps {
  mode: 'update' | 'create';
  workflowStatusId?: string;
  data?: workflowStatusRes;
}

interface IWorkFlowStatusFormValue {
  type: { name: string; value: 'start' | 'in-progress' | 'done' };
  name: string;
  description: string;
}

const WorkflowStatusModifierForm: FC<WorkflowStatusModifierFormProps> = ({
  mode,
  workflowStatusId,
  data,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    formState,
    reset,
    control,
    watch,
  } = useForm<IWorkFlowStatusFormValue>();

  const [createWorkflowStatus, { isLoading: createLoading }] = useCreateWorkflowStatusMutation();
  const [updateWorkflowStatus, { isLoading: updateLoading, isSuccess: updateSuccess }] =
    useUpdateWorkflowStatusMutation();

  const router = useRouter();
  useEffect(() => {
    if (mode === 'update' && data?.data) {
      setValue('name', data?.data.name.value);
      setValue('description', data?.data.description?.value);
      setValue('type', {
        name: convertStatusToPersian(data?.data.type),
        value: data?.data.type,
      });
    }
  }, [data?.data, mode, setValue]);

  useEffect(() => {
    updateSuccess && router.replace('/workflow-management/workflow-status-list');
  }, [updateSuccess, router]);

  const submit = async (data: IWorkFlowStatusFormValue) => {
    const body: createWorkflowStatusReq = {
      name: { _: 'StaticText', value: data.name },
      description: { _: 'StaticText', value: data.description },
      type: data.type.value as 'start' | 'in-progress' | 'done',
    };
    if (mode === 'update' && workflowStatusId) {
      await updateWorkflowStatus({ body, id: workflowStatusId }).unwrap();
    } else {
      const res = await createWorkflowStatus(body).unwrap();
      res.success && reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item md={6} xs={12}>
          <Select
            control={control}
            errors={errors}
            watch={watch}
            items={[
              { name: 'شروع', value: 'start' },
              { name: 'در حال انجام', value: 'in-progress' },
              { name: 'اتمام', value: 'done' },
            ]}
            name="type"
            setValue={setValue}
            label="نوع *"
            size="medium"
            disabled={false}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            label="نام *"
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
              (createLoading || updateLoading) && <CircularProgress size={12} color="primary" />
            }
            type="submit"
            variant="contained"
            disabled={createLoading || updateLoading || !formState.isDirty}
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default WorkflowStatusModifierForm;
