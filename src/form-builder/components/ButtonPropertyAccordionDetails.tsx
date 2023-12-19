import React from 'react';
import { Paper, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  ICardFormPropertiesState,
  setPrimaryButtonAlignment,
  setPrimaryButtonTitle,
} from '@/state-management/slices/cardFormPropertySlice';
import { AlignmentIcons } from '@/form-builder/shared';
import CancelButtonProperty from '@/form-builder/components/CancelButtonProperty';

const ButtonPropertyAccordionDetail = () => {
  const dispatch = useAppDispatch();
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);

  const handleAlignment = (alignment: ICardFormPropertiesState['primaryButtonAlignment']) => {
    dispatch(setPrimaryButtonAlignment({ primaryButtonAlignment: alignment }));
  };
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">دکمه اصلی</Typography>
        </Paper>
        <TextField
          sx={{ flex: 1 }}
          value={cardFormProperties.primaryButtonTitle}
          onChange={(e) => dispatch(setPrimaryButtonTitle({ primaryButtonTitle: e.target.value }))}
        />
      </Stack>
      <AlignmentIcons setAlignment={handleAlignment} />
      <CancelButtonProperty />
    </Stack>
  );
};

export default ButtonPropertyAccordionDetail;
