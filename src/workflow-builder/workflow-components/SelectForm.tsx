import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useAppContext } from '@/components/context/WorkflowProvider';
import { SelectChangeEvent } from '@mui/material';

const SelectForm = () => {
  const { form, setForm } = useAppContext();
  const handleChange = (event: SelectChangeEvent) => {
    setForm(event.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">نوع فرم</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={form}
        label="نوع فرم"
        onChange={handleChange}
      >
        <MenuItem value="leave">فرم مرخصی</MenuItem>
      </Select>
    </FormControl>
  );
};
export default SelectForm;
