import React, { FC } from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { InputLabelSectionProps } from '@/types/form-builder/inputLabelSection';

const InputLabelSection: FC<InputLabelSectionProps> = ({
  properties,
  dispatch,
  handleChangeLabel,
  name,
}) => {
  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Typography variant="subtitle1">عنوان ورودی</Typography>
      </Paper>
      <TextField
        sx={{
          flex: 1,
        }}
        size="small"
        value={
          properties.elementProperties[properties.listId][properties.currentIndex as number]
            ?.properties?.inputLabel
        }
        onChange={(e) => handleChangeLabel(e, dispatch, properties, name)}
      />
    </Stack>
  );
};
export default InputLabelSection;
