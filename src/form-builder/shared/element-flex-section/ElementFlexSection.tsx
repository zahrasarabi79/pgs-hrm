import React, { FC } from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { ElementFlexSectionProps } from '@/types/form-builder/elementFlexSection';

const ElementFlexSection: FC<ElementFlexSectionProps> = ({
  properties,
  dispatch,
  handleChangeFlex,
  name,
}) => {
  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Typography variant="subtitle1">flex</Typography>
      </Paper>
      <TextField
        type="number"
        inputProps={{ min: '2', max: '12' }}
        size="small"
        value={
          (properties.elementProperties[properties.listId][properties.currentIndex as number]
            ?.properties?.inputFlex as string) || '12'
        }
        onChange={(e) => handleChangeFlex(e, dispatch, properties, name)}
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
export default ElementFlexSection;
