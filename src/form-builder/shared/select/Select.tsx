import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { SelectOptions } from '@/public/data/otherData';

export interface CustomSelectProps<T> {
  value: string;
  handleChange: (e: SelectChangeEvent) => void;
  options: T;
}

function CustomSelect<T extends SelectOptions>({
  value,
  handleChange,
  options,
}: CustomSelectProps<T>) {
  return (
    <FormControl fullWidth sx={{ flex: 1 }}>
      <InputLabel id="demo-simple-select-label">انتخاب</InputLabel>
      <Select
        size="small"
        labelId="select-variant"
        id="select-variant"
        value={value || options[0].value}
        label="انتخاب"
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CustomSelect;
