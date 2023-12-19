import React from 'react';
import { useAppSelector } from '@/state-management/store/store';
import DateRangeValidation from '@/form-builder/element-validations/date-range-validation/DateRangeValidation';
import TimeRangeValidation from '@/form-builder/element-validations/time-range-validation/TimeRangeValidation';

const TimeBoxValidations = () => {
  const conditionalValue = useAppSelector((state) => state?.conditionalValue?.value);

  return <>{conditionalValue === 'daily' ? <DateRangeValidation /> : <TimeRangeValidation />}</>;
};
export default TimeBoxValidations;
