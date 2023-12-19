import React from 'react';
import { useAppSelector } from '@/state-management/store/store';
import NoContent from '@/form-builder/components/NoContent';
import DateRangeStyles from '@/form-builder/element-styles/date-range-styles/DateRangeStyles';
import TimeRangeStyles from '@/form-builder/element-styles/TimeRangeStyles';

const TimeBoxStyles = () => {
  const conditionalValue = useAppSelector((state) => state?.conditionalValue?.value);
  const properties = useAppSelector((state) => state.properties);

  return (
    <>
      {conditionalValue === 'daily' ? (
        !properties?.elementProperties[properties.listId][properties.currentIndex]?.id ||
        !Object.keys(
          properties?.elementProperties[properties.listId][properties.currentIndex],
        )?.includes('properties') ? (
          <NoContent text="تنظیمات ظاهری وجود ندارد" />
        ) : (
          <DateRangeStyles />
        )
      ) : !properties?.elementProperties[properties.listId][properties.currentIndex]?.id ||
        !Object.keys(
          properties?.elementProperties[properties.listId][properties.currentIndex],
        )?.includes('properties') ? (
        <NoContent text="تنظیمات ظاهری وجود ندارد" />
      ) : (
        <TimeRangeStyles />
      )}
    </>
  );
};
export default TimeBoxStyles;
