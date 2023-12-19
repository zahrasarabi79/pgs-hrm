import React from 'react';
import { useAppSelector } from '@/state-management/store/store';
import DateCalenderStyles from '@/form-builder/element-styles/DateCalenderStyles';

const DateRangeStyles = () => {
  // const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.properties);
  const { selectedRangeItem } = useAppSelector((state) => state.rangeElement.rangeElement);

  const elementStyles =
    properties.elementProperties[properties.listId][properties.currentIndex as number]?.properties
      .daily;

  return (
    <>
      {selectedRangeItem === 'from' ? (
        <DateCalenderStyles
          elementStyles={elementStyles?.from}
          selectedRangeItem={selectedRangeItem}
          styles={elementStyles}
        />
      ) : selectedRangeItem === 'to' ? (
        <DateCalenderStyles
          elementStyles={elementStyles?.to}
          selectedRangeItem={selectedRangeItem}
          styles={elementStyles}
        />
      ) : null}
    </>
  );
};
export default DateRangeStyles;
