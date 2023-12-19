import React, { ChangeEvent, FC } from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';

export interface MinSectionProps {
  min: string;
  max?: string;
  title?: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NumberSection: FC<MinSectionProps> = ({ min, max, title, value, handleChange }) => {
  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      {title && (
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">{title}</Typography>
        </Paper>
      )}
      <TextField
        size="small"
        type="number"
        inputProps={{ min, max }}
        value={value}
        onChange={handleChange}
        sx={{
          flex: 1,
          '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
            display: 'none',
          },
          '& input': {
            textAlign: 'center',
          },
        }}
      />
    </Stack>
  );
};
export default NumberSection;
