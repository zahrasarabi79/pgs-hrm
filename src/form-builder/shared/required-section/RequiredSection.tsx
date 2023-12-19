import React, { ChangeEvent, FC } from 'react';
import { Box, Paper, Stack, Switch, Typography } from '@mui/material';

export interface RequiredSectionProps {
  checked: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RequiredSection: FC<RequiredSectionProps> = ({ checked, handleChange }) => {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="subtitle1">الزامی</Typography>
        </Paper>
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default RequiredSection;
