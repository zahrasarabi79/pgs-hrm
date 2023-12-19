import React, { FC } from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Paper, Stack } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

interface MultipleSelectProps {
  selectItems: string[];
  item: string[];
  setItem: any;
  handleSelectChips: (selectedItems: string[]) => void;
}

const MultipleSelectChip: FC<MultipleSelectProps> = ({
  selectItems,
  item,
  setItem,
  handleSelectChips,
}) => {
  const handleChange = (event: SelectChangeEvent<typeof item>) => {
    const {
      target: { value },
    } = event;
    setItem(typeof value === 'string' ? value.split(',') : value);
    handleSelectChips(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <Paper>
      <Stack direction={'column'} gap={2}>
        <FormControl sx={{ width: '100%' }}>
          <InputLabel id="demo-multiple-chip-label">disable days</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            multiple
            value={item}
            onChange={handleChange}
            input={<OutlinedInput label="disable days" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {selectItems.map((selectItem) => (
              <MenuItem key={selectItem} value={selectItem}>
                {selectItem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  );
};

export default MultipleSelectChip;
