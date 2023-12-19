import { Panel } from 'reactflow';
import { Paper } from '@mui/material';
import { useAppContext } from '@/components/context/WorkflowProvider';

const RequestMessage = () => {
  const { openSnackbar } = useAppContext();
  return (
    <Panel position="top-center">
      <Paper
        sx={{
          p: 1,
          borderRadius: '10px',
          bgcolor: `${openSnackbar?.color}.main`,
        }}
      >
        {openSnackbar?.message}
      </Paper>
    </Panel>
  );
};

export default RequestMessage;
