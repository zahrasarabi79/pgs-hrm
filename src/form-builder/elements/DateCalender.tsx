import React, { FC, useMemo, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DateValidationError, DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { addDays } from 'date-fns';
import { AdapterDateFnsJalali } from '@mui/x-date-pickers/AdapterDateFnsJalali';
import { disableDay } from '@/form-builder/element-validations/date-range-validation/dateRangeValidation';

interface DateCalenderProps {
  allElementValidations?: any;
  elementStyle: any;
  elementValidation: any;
  errors: any;
  control: Control;
  index: number;
  type: 'to' | 'from' | 'calender';
  inputNames?: {
    [key: string]: string;
  };
  watch?: any;
  styles?: any;
}

const DateCalender: FC<DateCalenderProps> = ({
  control,
  elementStyle,
  elementValidation,
  errors,
  index,
  type,
  watch,
  inputNames,
  styles,
  allElementValidations,
}) => {
  const { fromDate } = inputNames || {};
  const [DatePickerError, setDatePickerError] = useState<DateValidationError | null>(null);
  const datePickerErrorMessage = useMemo(() => {
    switch (DatePickerError) {
      case 'disablePast': {
        return elementValidation?.errorMessages['disablePast'];
      }
      case 'maxDate': {
        return elementValidation?.errorMessages['maxDate'];
      }
      case 'minDate': {
        return elementValidation?.errorMessages['minDate'];
      }
      case 'invalidDate': {
        return elementValidation?.errorMessages['invalidDate'];
      }
      case 'shouldDisableDate': {
        return elementValidation?.errorMessages['shouldDisableDate'];
      }
      default: {
        return '';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DatePickerError]);

  const minDateValidation = () => {
    if (type === 'to') {
      // in 'to-date-calender' format , the minimum date should starts from 'from-date-calender' date
      return elementValidation?.isPastDisabled
        ? addDays(new Date(watch(fromDate) || Date.now()), 0)
        : null;
    } else {
      // in other formats the date-calender starts from today
      return elementValidation?.isPastDisabled
        ? addDays(new Date(), -elementValidation?.disabledPastDays)
        : null;
    }
  };

  const maxDateValidation = () => {
    if (type === 'to') {
      const fromDate1 = new Date(watch(fromDate) || Date.now());
      return allElementValidations?.from?.isFutureDisabled
        ? addDays(fromDate1, allElementValidations?.from?.disabledFutureDays)
        : null;
    } else {
      // type == from , type === calender
      return elementValidation?.isFutureDisabled
        ? addDays(Date.now(), elementValidation?.disabledFutureDays)
        : null;
    }
  };

  return (
    <Controller
      name={`${elementStyle?.inputLabel}-${index}-${type}` || `input-${type}`}
      control={control}
      rules={{
        required: {
          value: true,
          message: elementValidation?.errorMessages['requiredMessage'],
        },
        validate: () => !DatePickerError,
      }}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
          <DesktopDatePicker
            {...field}
            value={field.value || Date.now()}
            label={elementStyle?.inputLabel}
            onError={(newError) => {
              setDatePickerError(newError);
            }}
            shouldDisableDate={(date) => disableDay(date, elementValidation)}
            minDate={minDateValidation()}
            maxDate={maxDateValidation()}
            slotProps={{
              textField: {
                variant: elementStyle?.inputVariant,
                fullWidth: true,
                size: styles?.inputSize,
                placeholder: elementStyle?.inputPlaceholder,
                error: Boolean(errors[elementStyle?.inputLabel]) || Boolean(DatePickerError),
                helperText:
                  datePickerErrorMessage ||
                  (Boolean(errors[elementStyle?.inputLabel]?.message) &&
                    (errors[elementStyle?.inputLabel]?.message as string)),
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default DateCalender;
