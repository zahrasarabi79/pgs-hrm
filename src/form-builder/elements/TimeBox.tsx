import { ChangeEvent, FC } from 'react';
import { Card, CardContent, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { IValue, setConditionalValue } from '@/state-management/slices/conditionalValueSlice';
import DateRange from '@/form-builder/elements/date-range';
import { TimeRange } from '@/form-builder/elements/TimeRange';

export interface TimeBoxProps {
  control: any;
  index: number;
  errors: any;
  watch: any;
}

const TimeBox: FC<TimeBoxProps> = ({ control, index, errors, watch }) => {
  const dispatch = useAppDispatch();
  const conditionalValue = useAppSelector((state) => state?.conditionalValue?.value);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setConditionalValue({ value: event.target.value as IValue }));
  };
  return (
    <Card sx={{ borderRadius: '10px' }}>
      <CardContent>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={conditionalValue}
            onChange={handleChange}
            sx={{ display: 'inline-block' }}
          >
            <FormControlLabel value="daily" control={<Radio />} label="روزانه" />
            <FormControlLabel value="hourly" control={<Radio />} label="ساعتی" />
          </RadioGroup>
        </FormControl>
        <Divider sx={{ my: 2 }} />
        {conditionalValue === 'daily' ? (
          <DateRange control={control} index={index} errors={errors} watch={watch} />
        ) : (
          <TimeRange control={control} index={index} errors={errors} watch={watch} />
        )}
      </CardContent>
    </Card>
  );
};

export default TimeBox;
