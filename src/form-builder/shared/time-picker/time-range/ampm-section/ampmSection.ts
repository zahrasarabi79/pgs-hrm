import { ChangeEvent, Dispatch } from 'react';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangeAmPm = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<any>,
  properties: IPropertiesState,
  propertyKey: 'from' | 'to' | 'calender',
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  dispatch(
    updateElementProperties({
      id: properties.id,
      type: 'time-range',
      uniqueName: `time-range-${properties.currentIndex}`,
      validations: {
        ...validations,
        [propertyKey]: {
          ...validations[propertyKey],
          ampm: e.target.checked,
        },
      },
    }),
  );
};
