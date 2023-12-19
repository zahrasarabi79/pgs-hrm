import { Paper, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import {
  handleChangeLabel,
  handleChangeVariant,
} from '@/form-builder/element-styles/date-range-styles/dateRangeStyles';
import { Select } from '@/form-builder/shared';
import { TextFieldVariantProperties } from '@/public/data/otherData';

interface DateCalenderStylesProps {
  selectedRangeItem: 'to' | 'from' | 'calender';
  elementStyles: any;
  styles: any;
}

const DateCalenderStyles: FC<DateCalenderStylesProps> = ({ elementStyles, selectedRangeItem }) => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const conditionalValue = useAppSelector((state) => state?.conditionalValue?.value);

  return (
    <Stack gap={2} sx={{ alignItems: 'center', mx: 1 }}>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">input label </Typography>
        </Paper>
        <TextField
          sx={{
            flex: 1,
          }}
          value={elementStyles?.inputLabel}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChangeLabel(e, dispatch, properties, selectedRangeItem, conditionalValue)
          }
        />
      </Stack>
      <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <Typography variant="subtitle1">مدل</Typography>
        </Paper>
        <Select
          value={elementStyles?.inputVariant as string}
          handleChange={(e: SelectChangeEvent) =>
            handleChangeVariant(e, dispatch, properties, selectedRangeItem, conditionalValue)
          }
          options={TextFieldVariantProperties}
        />
      </Stack>
    </Stack>
  );
};

export default DateCalenderStyles;
