import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { UseFormWatch } from 'react-hook-form';
import { differenceInDays } from '@/form-builder/element-validations/date-range-validation/dateRangeValidation';

interface AdditionalInfoProps {
  watch: UseFormWatch<any>;
  inputNames: {
    [key: string]: string;
  };
  styles?: any;
}

const AdditionalInfo: FC<AdditionalInfoProps> = ({ watch, inputNames, styles }) => {
  const { fromDate, toDate } = inputNames;
  const toDateTimestamp = new Date(watch(toDate) as Date).getTime();
  const fromDateTimestamp = new Date(watch(fromDate) as Date).getTime();

  const FromDay = new Date(watch(fromDate) as Date).toLocaleString('fa', {
    weekday: 'long',
  });
  const toDay = new Date(watch(toDate) as Date).toLocaleString('fa', { weekday: 'long' });
  return (
    <>
      <TextField
        value={
          toDateTimestamp && fromDateTimestamp && toDateTimestamp >= fromDateTimestamp
            ? (
                differenceInDays(
                  watch(fromDate) as unknown as string,
                  watch(toDate) as unknown as string,
                ) + 1
              ).toFixed(0) + ' روز'
            : 0 + ' روز'
        }
        disabled
        fullWidth
        label="به مدت"
        size={styles?.inputSize}
      />
      <TextField
        size={styles?.inputSize}
        value={watch(fromDate) ? FromDay : ''}
        disabled
        fullWidth
        label="از روز "
      />
      <TextField
        size={styles?.inputSize}
        value={watch(toDate) ? toDay : ''}
        disabled
        fullWidth
        label="تا روز "
      />
    </>
  );
};

export default AdditionalInfo;
