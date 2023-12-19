import React from 'react';
import { useAppSelector } from '@/state-management/store/store';
import DateCalenderStyles from '@/form-builder/element-styles/DateCalenderStyles';
import TimeCalenderStyles from '@/form-builder/element-styles/TimeCalenderStyles';

const TimeRangeStyles = () => {
  const properties = useAppSelector((state) => state.properties);
  const { selectedRangeItem } = useAppSelector((state) => state.rangeElement.rangeElement);
  const elementStyles =
    properties.elementProperties[properties.listId][properties.currentIndex as number]?.properties
      ?.hourly;

  return (
    <>
      {selectedRangeItem === 'calender' ? (
        <DateCalenderStyles
          elementStyles={elementStyles?.calender}
          selectedRangeItem={selectedRangeItem}
          styles={elementStyles}
        />
      ) : selectedRangeItem === 'from' ? (
        <TimeCalenderStyles
          elementStyles={elementStyles?.from}
          selectedRangeItem={selectedRangeItem}
        />
      ) : selectedRangeItem === 'to' ? (
        <TimeCalenderStyles
          elementStyles={elementStyles?.to}
          selectedRangeItem={selectedRangeItem}
        />
      ) : null}
    </>
  );
};
export default TimeRangeStyles;
