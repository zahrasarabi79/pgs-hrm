import { FC } from 'react';
import { Fade, Stack, TextField } from '@mui/material';
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setSelectRangeItem } from '@/state-management/slices/rangeElementsSlice';
import DateCalender from '@/form-builder/elements/DateCalender';
import TimeCalender from '@/form-builder/elements/TimeCalender';

interface TimeRangeProps {
  control: Control;
  index: number;
  errors: FieldErrors;
  watch: UseFormWatch<any>;
}

export const TimeRange: FC<TimeRangeProps> = ({ index, errors, watch, control }) => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);

  const elementStyles = properties?.elementProperties[properties.listId][index]?.properties?.hourly;
  const elementValidations =
    properties?.elementProperties[properties.listId][index]?.validations?.hourly;
  // element names
  const hourlyFromTime = `${elementStyles?.from?.inputLabel}-from`;
  const hourlyToTime = `${elementStyles?.to?.inputLabel}-to`;
  const hourlyDatePicker = `${elementStyles?.calender?.inputLabel}-${index}-calender`;

  // requirements
  const selectedDay = new Date(watch(hourlyDatePicker) as Date).toLocaleString('fa', {
    weekday: 'long',
  });
  const today = new Date(Date.now()).toLocaleString('fa', {
    weekday: 'long',
  });
  const hourlyDateTimestamp = new Date(watch(hourlyDatePicker) as Date).getTime();

  const fromTimeMs = new Date(watch(hourlyFromTime) as Date).getTime();
  const toTimeMs = new Date(watch(hourlyToTime) as Date).getTime();

  const timeDifferenceMs = toTimeMs - fromTimeMs;

  // Calculate hours and minutes
  const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60));
  return (
    <Fade in>
      <Stack direction={'row'} gap={2}>
        <div
          onClick={() => dispatch(setSelectRangeItem({ selectedRangeItem: 'calender' }))}
          style={{ width: '100%' }}
        >
          <DateCalender
            control={control}
            errors={errors}
            index={index}
            elementStyle={elementStyles?.calender}
            elementValidation={elementValidations?.calender}
            type="calender"
            styles={elementStyles}
          />
        </div>
        <TextField
          size={elementStyles?.inputSize}
          disabled
          value={hourlyDateTimestamp ? selectedDay : today}
          fullWidth
          label="روز"
        />
        <div
          onClick={() => {
            dispatch(setSelectRangeItem({ selectedRangeItem: 'from' }));
          }}
          style={{ width: '100%' }}
        >
          <TimeCalender
            elementValidation={elementValidations?.from}
            allElementValidations={elementValidations}
            elementStyles={elementStyles?.from}
            hourlyFromTimeInput={hourlyFromTime}
            control={control}
            errors={errors}
            watch={watch}
            type="from"
            styles={elementStyles}
          />
        </div>
        <div
          onClick={() => dispatch(setSelectRangeItem({ selectedRangeItem: 'to' }))}
          style={{ width: '100%' }}
        >
          <TimeCalender
            elementValidation={elementValidations?.to}
            allElementValidations={elementValidations}
            elementStyles={elementStyles?.to}
            control={control}
            errors={errors}
            watch={watch}
            hourlyFromTimeInput={hourlyFromTime}
            type="to"
            styles={elementStyles}
          />
        </div>
        <TextField
          value={watch(hourlyFromTime) && watch(hourlyToTime) ? hours : ''}
          disabled
          fullWidth
          label="به مدت (ساعت)"
          size={elementStyles?.inputSize}
        />
        <TextField
          value={watch(hourlyFromTime) && watch(hourlyToTime) ? minutes : ''}
          disabled
          fullWidth
          label="به مدت (دقیقه)"
          size={elementStyles?.inputSize}
        />
      </Stack>
    </Fade>
  );
};
