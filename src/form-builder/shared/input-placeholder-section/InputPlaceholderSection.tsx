import React, { FC } from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { InputPlaceholderSectionProps } from '@/types/form-builder/inputPlaceholderSection';

const InputPlaceholderSection: FC<InputPlaceholderSectionProps> = ({
  handleChangePlaceholder,
  properties,
  dispatch,
  name,
}) => {
  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Typography variant="subtitle1">نگه دارنده مکان</Typography>
      </Paper>
      <TextField
        sx={{
          flex: 1,
        }}
        size="small"
        defaultValue={
          properties.elementProperties[properties.listId][properties.currentIndex as number]
            ?.properties?.inputPlaceholder || 'نگه دارنده مکان'
        }
        onChange={(e) => handleChangePlaceholder(e, dispatch, properties, name)}
      />
    </Stack>
  );
};
export default InputPlaceholderSection;
