import React, { FC } from 'react';
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { Fade, Stack } from '@mui/material';
import AdditionalInfo from './AdditionalInfo';
import DateCalender from '../DateCalender';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setSelectRangeItem } from '@/state-management/slices/rangeElementsSlice';

interface DateRangeBoxProps {
  control: Control;
  index: number;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
}

const DateRangeBox: FC<DateRangeBoxProps> = ({ control, errors, index, watch }) => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const elementStyles = properties?.elementProperties[properties.listId][index]?.properties?.daily;
  const inputNames = {
    fromDate: `${elementStyles?.from?.inputLabel}-${index}-from`,
    toDate: `${elementStyles?.to?.inputLabel}-${index}-to`,
  };
  const elementValidations =
    properties?.elementProperties[properties.listId][index]?.validations?.daily;
  return (
    <Fade in>
      <Stack direction={'row'} gap={2}>
        <div
          onClick={() => dispatch(setSelectRangeItem({ selectedRangeItem: 'from' }))}
          style={{ width: '100%' }}
        >
          <DateCalender
            elementStyle={elementStyles?.from}
            control={control}
            elementValidation={elementValidations?.from}
            inputNames={inputNames}
            errors={errors}
            index={index}
            type="from"
            styles={elementStyles}
          />
        </div>
        <div
          onClick={() => dispatch(setSelectRangeItem({ selectedRangeItem: 'to' }))}
          style={{ width: '100%' }}
        >
          <DateCalender
            elementStyle={elementStyles?.to}
            control={control}
            elementValidation={elementValidations?.to}
            allElementValidations={elementValidations}
            inputNames={inputNames}
            watch={watch}
            errors={errors}
            index={index}
            type="to"
            styles={elementStyles}
          />
        </div>
        <AdditionalInfo inputNames={inputNames} watch={watch} styles={elementStyles} />
      </Stack>
    </Fade>
  );
};

export default DateRangeBox;
