import { Dispatch } from '@reduxjs/toolkit';
import { ChangeEvent } from 'react';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangeDisabledPastHours = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  TimeUnit: 'hours' | 'minutes',
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];

  // Update the corresponding property based on the TimeUnit
  const updatedValidations = {
    ...validations,
    hourly: {
      ...validations.hourly,
      ['from']: {
        ...validations.hourly['from'],
        disabledTimeFrom: {
          ...validations.hourly['from']?.disabledTimeFrom,
          [TimeUnit]: Number(e.target.value),
        },
      },
    },
  };

  // Dispatch an action to update element properties
  dispatch(
    updateElementProperties({
      id: properties.id,
      type: 'date-box',
      uniqueName: `date-box-${properties.currentIndex}`,
      validations: updatedValidations,
    }),
  );
};

export const handleChangeDisabledFutureHours = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  TimeUnit: 'hours' | 'minutes',
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  // Update the corresponding property based on the TimeUnit
  const updatedValidations = {
    ...validations,
    hourly: {
      ...validations.hourly,
      ['from']: {
        ...validations.hourly['from'],
        disabledTimeTo: {
          ...validations.hourly['from']?.disabledTimeTo,
          [TimeUnit]: Number(e.target.value),
        },
      },
    },
  };

  // Dispatch an action to update element properties
  dispatch(
    updateElementProperties({
      id: properties.id,
      type: 'date-box',
      uniqueName: `date-box-${properties.currentIndex}`,
      validations: updatedValidations,
    }),
  );
};
