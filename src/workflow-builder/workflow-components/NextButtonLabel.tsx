import { TextField } from '@mui/material';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { ChangeEvent } from 'react';

const NextButtonLabel = () => {
  const { nextButtonLabel, setNextButtonLabel } = useAppContext();
  return (
    <TextField
      label="عنوان دکمه بعد"
      value={nextButtonLabel}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setNextButtonLabel(e.target.value)}
    />
  );
};
export default NextButtonLabel;
