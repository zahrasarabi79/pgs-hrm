import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material';
import { useAppContext } from '@/components/context/WorkflowProvider';

const TriggerType = () => {
  const { triggerType, setTriggerType } = useAppContext();
  const handleChange = (event: SelectChangeEvent) => {
    setTriggerType(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">نوع عملیات</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={triggerType}
        label="نوع عملیات"
        onChange={handleChange}
      >
        <MenuItem value="AutoTrigger">خودکار</MenuItem>
        <MenuItem value="FormTrigger">فرم</MenuItem>
        <MenuItem value="NextTrigger">دکمه بعد</MenuItem>
      </Select>
    </FormControl>
  );
};
export default TriggerType;
