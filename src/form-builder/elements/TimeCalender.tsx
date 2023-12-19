import React, { FC, useMemo, useState } from 'react';
import {
  LocalizationProvider,
  renderTimeViewClock,
  TimePicker,
  TimeValidationError,
} from '@mui/x-date-pickers';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { Control, Controller, FieldErrors } from 'react-hook-form';

export interface TimeCalenderProps {
  control: Control<any, any>;
  allElementValidations?: any;
  errors: FieldErrors<any>;
  elementValidation: any;
  elementStyles: any;
  type: 'to' | 'from' | 'calender';
  watch?: any;
  hourlyFromTimeInput?: string;
  styles?: any;
}

const TimeCalender: FC<TimeCalenderProps> = ({
  control,
  errors,
  elementStyles,
  elementValidation,
  type,
  watch,
  hourlyFromTimeInput,
  styles,
  allElementValidations,
}) => {
  const [timeError, setTimeError] = useState<TimeValidationError | null>(null);

  const timeErrorMessage = useMemo(() => {
    switch (timeError) {
      case 'minTime':
        return elementValidation?.errorMessages['minTime'];
      case 'maxTime':
        return elementValidation?.errorMessages['maxTime'];
      case 'invalidDate':
        return elementValidation?.errorMessages['invalidDate'];
      default:
        return '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeError]);

  return (
    <Controller
      name={`${elementStyles?.inputLabel}-${type}` || 'fromHour'}
      control={control}
      rules={{
        required: true,
        validate: () => !timeError,
      }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <TimePicker
            {...field}
            value={field.value || Date.now()}
            label={elementStyles?.inputLabel}
            ampm={false}
            onError={(newError) => {
              setTimeError(newError);
            }}
            minTime={
              type === 'from'
                ? new Date(
                    0,
                    0,
                    0,
                    allElementValidations?.from?.disabledTimeFrom['hours'],
                    allElementValidations?.from?.disabledTimeFrom['minutes'],
                  )
                : type === 'to'
                  ? watch(hourlyFromTimeInput)
                    ? new Date(new Date(watch(hourlyFromTimeInput))!.getTime() + 60000)
                    : new Date(
                        0,
                        0,
                        0,
                        allElementValidations?.from?.disabledTimeFrom['hours'],
                        allElementValidations?.from?.disabledTimeFrom['minutes'],
                      )
                  : type === 'calender'
                    ? new Date(
                        0,
                        0,
                        0,
                        elementValidation?.disabledTimeFrom['hours'],
                        elementValidation?.disabledTimeFrom['minutes'],
                      )
                    : null
            }
            maxTime={
              new Date(
                0,
                0,
                0,
                allElementValidations?.from?.disabledTimeTo['hours'],
                allElementValidations?.from?.disabledTimeTo['minutes'],
              )
            }
            // as you see in the validations , in both to and from situations '
            // we are refering the max and min time based of 'from' calender
            // it is because the second calender must be relevant to first calender
            // in validation forms when we are changing the max and min date , in both conditions are changing the validations of the 'from'
            // in simple words we should change always one index and depend the other calender to that
            // in previous version , we had set the min and max for both calenders ;
            // that manner made conflicts ; in current version we just change the one calender validations and other one adjusts with that calender configs ;
            // so this is why we are measuring everything based on 'from-time' validations
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            slotProps={{
              textField: {
                variant: elementStyles?.inputVariant,
                fullWidth: true,
                size: styles?.inputSize,
                error: Boolean(errors[elementStyles?.inputLabel]) || Boolean(timeError),
                helperText:
                  timeErrorMessage ||
                  (Boolean(errors[elementStyles?.inputLabel]?.message) &&
                    (errors[elementStyles?.inputLabel]?.message as string)),
              },
            }}
            sx={{
              '& .MuiPickersClock-pinner': {
                backgroundColor: 'red', // Change this to your desired color
              },
              '& .MuiPickersClock-thumb.Mui-selected': {
                borderColor: '#green', // Change this to your desired color
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default TimeCalender;
