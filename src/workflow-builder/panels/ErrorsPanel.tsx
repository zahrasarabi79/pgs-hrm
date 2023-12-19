import { FC, useEffect } from 'react';
import { Panel } from 'reactflow';
import { FormHelperText, Paper } from '@mui/material';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { FieldErrors } from 'react-hook-form';
import { IFormValues } from '@/types/workflow-builder/formAdaptore';
import { IGraphError } from '@/types/workflow-builder/workflowProvider';

const ErrorsPanel: FC<{
  errors: FieldErrors<IFormValues>;
  errorMessage: IGraphError | string[] | undefined;
}> = ({ errors, errorMessage }) => {
  const { setGraphError, graphError } = useAppContext();

  useEffect(() => {
    if (!errorMessage) {
      setGraphError({ id: '', message: '' });
    }
  }, [errorMessage, setGraphError]);

  return (
    <Panel position="top-center">
      {!!graphError?.message && (
        <Paper variant="elevation" sx={{ p: 1, borderRadius: '10px' }}>
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {graphError.message}
          </FormHelperText>
        </Paper>
      )}
      {errors.nodes && errors.nodes?.types && (
        <Paper variant="elevation" sx={{ p: 1, borderRadius: '10px' }}>
          <FormHelperText error sx={{ fontSize: '1rem' }}>
            {errors.nodes.types?.minLength?.toString()}
          </FormHelperText>
        </Paper>
      )}
    </Panel>
  );
};

export default ErrorsPanel;
