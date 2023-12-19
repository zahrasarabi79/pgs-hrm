import React, { ChangeEvent, FC } from 'react';
import { Box, Collapse, Paper, Stack, Switch, Typography } from '@mui/material';
import { NumberSection } from '@/form-builder/shared';

export interface DisablePastFutureSection {
  mode: 'past' | 'future';
  checked: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  numberOfDisabledDays: string;
  handleChangeDisabledDays: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DisablePastFutureSection: FC<DisablePastFutureSection> = ({
  checked,
  handleChange,
  numberOfDisabledDays,
  handleChangeDisabledDays,
  mode,
}) => {
  return (
    <>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="subtitle1">
            {mode === 'past' ? 'disable past' : 'disable future'}
          </Typography>
        </Paper>
        <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Box>
      </Stack>
      <Collapse in={checked}>
        {mode === 'past' ? (
          <NumberSection
            min="2"
            max="10"
            title="down to"
            value={numberOfDisabledDays}
            handleChange={handleChangeDisabledDays}
          />
        ) : (
          <NumberSection
            min="2"
            max="10"
            title="up to"
            value={numberOfDisabledDays}
            handleChange={handleChangeDisabledDays}
          />
        )}
      </Collapse>
    </>
  );
};

export default DisablePastFutureSection;
