import React from 'react';
import { useAppSelector } from '@/state-management/store/store';
import DateCalenderValidationForSingleCalender from '@/form-builder/element-validations/date-calender-validation/DateCalenderValidationForSingleCalender';
import TimeCalenderValidation from '@/form-builder/element-validations/TimeCalenderValidation';

const TimeRangeValidation = () => {
  // const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const { selectedRangeItem } = useAppSelector((state) => state.rangeElement.rangeElement);

  const elementValidations =
    properties?.elementProperties[properties.listId][properties.currentIndex].validations?.hourly;

  return (
    <>
      {selectedRangeItem === 'calender' ? (
        <DateCalenderValidationForSingleCalender
          elementValidations={elementValidations?.calender}
          selectedRangeItem={selectedRangeItem}
        />
      ) : selectedRangeItem === 'from' ? (
        <TimeCalenderValidation
          elementValidations={elementValidations?.from}
          selectedRangeItem={selectedRangeItem}
          allElementValidations={elementValidations}
        />
      ) : selectedRangeItem === 'to' ? (
        <TimeCalenderValidation
          elementValidations={elementValidations?.to}
          selectedRangeItem={selectedRangeItem}
          allElementValidations={elementValidations}
        />
      ) : null}
    </>
  );
};
export default TimeRangeValidation;
