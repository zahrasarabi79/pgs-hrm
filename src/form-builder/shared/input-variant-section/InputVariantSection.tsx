import { Paper, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { InputVariantSectionProps } from '@/types/form-builder/inputVariantSection';
import { Select } from '@/form-builder/shared';
import { TextFieldVariantProperties } from '@/public/data/otherData';

const InputVariantSection: FC<InputVariantSectionProps> = ({
  handleChangeOption,
  properties,
  dispatch,
  name,
}) => {
  return (
    <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
      <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Typography variant="subtitle1">مدل</Typography>
      </Paper>
      <Select
        value={
          properties.elementProperties[properties.listId][properties.currentIndex as number]
            ?.properties?.inputVariant as string
        }
        handleChange={(e) => handleChangeOption(e, dispatch, properties, name)}
        options={TextFieldVariantProperties}
      />
    </Stack>
  );
};
export default InputVariantSection;
