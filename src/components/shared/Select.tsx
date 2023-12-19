import React, { FC, useState } from 'react';
import {
  FormHelperText,
  MenuItem,
  OutlinedInput,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  CircularProgress,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CustomSelectComponentProps } from '@/types/component-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

interface SelectItem {
  name: string;
  value: string;
}

const SelectComponent: FC<CustomSelectComponentProps> = ({
  disabled,
  label,
  size,
  items,
  control,
  errors,
  name,
  setValue,
  watch,
}) => {
  const [selectItem, setSelectItem] = useState<SelectItem>();

  const handleChange = (event: SelectChangeEvent<typeof selectItem>) => {
    const selectedItem = items.find((item) => item.name === event.target.value) || [];
    setSelectItem(selectedItem as SelectItem);
    setValue(name, selectedItem, { shouldDirty: true, shouldValidate: true });
  };
  return (
    <div>
      <FormControl fullWidth disabled={disabled} size={size}>
        <InputLabel
          color={Boolean(errors[name]?.message) ? 'error' : 'primary'}
          id="select-component"
        >
          {label}
        </InputLabel>

        <Controller
          name={name}
          control={control}
          rules={{ required: 'این فیلد الزامی است' }}
          render={({ field }) => (
            <Select
              {...field}
              dir="rtl"
              labelId="select-component"
              label={label}
              value={watch(name) ? watch(name).name : ''}
              error={Boolean(errors[name]?.message)}
              onChange={handleChange}
              input={<OutlinedInput label={label} />}
              MenuProps={MenuProps}
            >
              {items.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box>
              ) : (
                items.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))
              )}
            </Select>
          )}
        />

        <FormHelperText sx={{ color: 'red' }}>{errors[name]?.message as string}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default SelectComponent;
