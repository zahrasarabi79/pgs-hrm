import { FC, useEffect } from 'react';
import { WorkflowModifierFormProps } from '@/types/component-types';
import { useForm } from 'react-hook-form';
import { Button, CircularProgress, Grid, TextField } from '@mui/material';
import { Select } from '@/components/shared';
import { v4 as uuid } from 'uuid';
import {
  useAddWorkflowMutation,
  useUpdateWorkflowMutation,
} from '@/state-management/apis/workflowApi';
import { useRouter } from 'next/navigation';

export interface IWorkflowFormValues {
  name: string;
  service: { name: string; value: string };
  trigger: { name: string; value: string };
  description?: string;
}

const WorkflowModifierForm: FC<WorkflowModifierFormProps> = ({ mode, workflowData }) => {
  const [addWorkflow, { isLoading: addLoading }] = useAddWorkflowMutation();
  const [updateWorkflow, { isLoading: updateLoading, isSuccess }] = useUpdateWorkflowMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    watch,
    setValue,
    reset,
  } = useForm<IWorkflowFormValues>();

  const router = useRouter();
  useEffect(() => {
    // back-end does not send response for patch request
    // this is why we cant check the success from response in submit functions
    isSuccess && router.replace('/workflow-management/workflow-list');
  }, [isSuccess, router]);

  const submit = async (data: IWorkflowFormValues) => {
    if (mode === 'update') {
      await updateWorkflow({
        name: { _: 'StaticText', value: data.name },
        service: { _: 'SystemService', name: data.service.value },
        trigger: { _: 'FormWorkflowTrigger', formId: data.trigger.value },
        description: { _: 'StaticText', value: data?.description as string },
        workflowId: workflowData?.id as string,
      }).unwrap();
    } else {
      const res = await addWorkflow({
        name: { _: 'StaticText', value: data.name },
        service: { _: 'SystemService', name: data.service.value },
        description: { _: 'StaticText', value: data?.description as string },
        trigger: { _: 'FormWorkflowTrigger', formId: data.trigger.value },
      }).unwrap();
      res.success && reset();
    }
  };

  useEffect(() => {
    if (mode === 'update' && workflowData) {
      setValue('name', workflowData.name.value);
      setValue('service', {
        name: 'مرخصی',
        value: workflowData.service.name,
      });
      setValue('trigger', {
        name: 'فرم مرخصی',
        value: workflowData.trigger.formId,
      });
      setValue('description', workflowData?.description?.value);
    }
  }, [workflowData, mode, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <TextField
            fullWidth
            label="عنوان *"
            inputProps={{
              maxLength: 50,
            }}
            {...register('name', { required: 'این فیلد الزامی است' })}
            error={Boolean(errors.name?.message)}
            helperText={Boolean(errors.name?.message) && errors.name?.message}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Select
            name="service"
            label="سرویس *"
            size="medium"
            disabled={false}
            items={[{ name: 'مرخصی', value: 'leave' }]}
            errors={errors}
            control={control}
            setValue={setValue}
            watch={watch}
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Select
            name="trigger"
            label="فرم شروع *"
            size="medium"
            disabled={false}
            items={[{ name: 'فرم مرخصی', value: uuid() }]}
            errors={errors}
            control={control}
            setValue={setValue}
            watch={watch}
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
              (addLoading || updateLoading) && <CircularProgress size={12} color="primary" />
            }
            variant="contained"
            type="submit"
            disabled={addLoading || updateLoading || !isDirty}
          >
            ثبت
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default WorkflowModifierForm;
