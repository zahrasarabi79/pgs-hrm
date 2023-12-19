import React from 'react';
import { Collapse, Paper, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  CardFormVariant,
  setBorderRadius,
  setElevation,
  setVariant,
} from '@/state-management/slices/cardFormPropertySlice';
import { Accordion, Select } from '@/form-builder/shared';
import HeaderPropertyAccordionDetail from '@/form-builder/components/HeaderPropertyAccordionDetail';
import ButtonPropertyAccordionDetail from '@/form-builder/components/ButtonPropertyAccordionDetails';
import { cardVariantProperties } from '@/public/data/otherData';
// import {
//   CardFormVariant,
//   setBorderRadius,
//   setElevation,
//   setVariant,
// } from '@/redux/slices/cardFormPropertiesSlice';

const CardFormStyles = () => {
  const dispatch = useAppDispatch();
  const cardFormProperties = useAppSelector((state) => state?.cardFormProperties);

  const handleChange = (e: SelectChangeEvent) => {
    dispatch(setVariant({ variant: e.target.value as CardFormVariant }));
  };

  return (
    <Stack gap={1.5} sx={{ alignItems: 'center', mx: 1 }}>
      <Accordion
        summaryContent={<Typography variant="subtitle1">سربرگ کارت</Typography>}
        detailsContent={<HeaderPropertyAccordionDetail />}
      />
      <Accordion
        summaryContent={<Typography variant="subtitle1">دکمه ها</Typography>}
        detailsContent={<ButtonPropertyAccordionDetail />}
      />
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">شعاع مرزی</Typography>
        </Paper>
        <TextField
          sx={{
            flex: 1,
            '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
              display: 'none',
            },
            '& input': {
              textAlign: 'center',
            },
          }}
          type="number"
          value={cardFormProperties?.borderRadius}
          onChange={(e) => dispatch(setBorderRadius({ borderRadius: +e.target.value }))}
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">مدل</Typography>
        </Paper>
        <Select
          value={cardFormProperties?.variant as string}
          handleChange={handleChange}
          options={cardVariantProperties}
        />
      </Stack>
      <Collapse in={cardFormProperties?.variant === 'elevation'} sx={{ width: '100%' }}>
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Typography variant="subtitle1">سایه</Typography>
          </Paper>
          <TextField
            sx={{
              flex: 1,
              '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
                display: 'none',
              },
              '& input': {
                textAlign: 'center',
              },
            }}
            type="number"
            value={cardFormProperties?.elevation}
            onChange={(e) => dispatch(setElevation({ elevation: +e.target.value }))}
          />
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default CardFormStyles;
