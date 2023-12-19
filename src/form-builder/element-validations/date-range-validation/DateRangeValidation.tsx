import React from 'react';
import DateCalenderValidation from '../date-calender-validation/DateCalenderValidation';
import { useAppSelector } from '@/state-management/store/store';

const DateRangeValidation = () => {
  const properties = useAppSelector((state) => state?.properties);
  const { selectedRangeItem } = useAppSelector((state) => state.rangeElement.rangeElement);

  const elementValidations =
    properties?.elementProperties[properties.listId][properties.currentIndex]?.validations?.daily;

  return (
    <DateCalenderValidation
      elementValidations={
        selectedRangeItem === 'from' ? elementValidations?.from : elementValidations?.to
      }
      selectedRangeItem={selectedRangeItem}
      allElementValidations={elementValidations}
    />
  );
};
export default DateRangeValidation;
