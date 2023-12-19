import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangeVariant = (
  e: SelectChangeEvent | any,
  dispatch: Dispatch,
  properties: IPropertiesState,
  nestedChildrenPropertyKey: 'from' | 'to' | 'calender',
  childPropertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const nestedElementPropertiesObj =
    elementProperties[listId][currentIndex]?.properties[childPropertyKey][
      nestedChildrenPropertyKey
    ];
  const elementPropertiesObj =
    elementProperties[listId][currentIndex]?.properties[childPropertyKey];

  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `date-box-${properties.currentIndex}`,
      properties: {
        [childPropertyKey]: {
          inputSize:
            properties.elementProperties[properties.listId][properties.currentIndex]?.properties[
              childPropertyKey
            ]?.inputSize,
          [nestedChildrenPropertyKey === 'to' ? 'from' : 'to']: {
            ...elementPropertiesObj[nestedChildrenPropertyKey === 'to' ? 'from' : 'to'],
          },
          [nestedChildrenPropertyKey]: {
            ...nestedElementPropertiesObj,
            inputVariant: e.target.value,
          },
        },
      },
      type: 'date-box',
    }),
  );
};

export const handleChangeLabel = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  nestedChildrenPropertyKey: 'from' | 'to' | 'calender',
  childPropertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const nestedElementPropertiesObj =
    elementProperties[listId][currentIndex]?.properties[childPropertyKey][
      nestedChildrenPropertyKey
    ];
  const elementPropertiesObj =
    elementProperties[listId][currentIndex]?.properties[childPropertyKey];

  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `date-box-${properties.currentIndex}`,
      properties: {
        [childPropertyKey]: {
          ...elementPropertiesObj,
          [nestedChildrenPropertyKey]: {
            ...nestedElementPropertiesObj,
            inputLabel: e.target.value,
          },
        },
      },
      type: 'date-box',
    }),
  );
};

export const handleChangePlaceholder = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  propertyKey: 'from' | 'to' | 'calender',
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { properties: elementPropertiesObj } = elementProperties[listId][currentIndex];
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `date-box-${properties.currentIndex}`,
      properties: {
        ...properties,
        [propertyKey]: {
          ...elementPropertiesObj[propertyKey],
          inputPlaceholder: e.target.value,
        },
      },
      type: 'date-box',
    }),
  );
};

export const handleChangeInputSize = (
  e: ChangeEvent<HTMLInputElement> | any,
  dispatch: Dispatch,
  properties: IPropertiesState,
  childPropertyKey: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `date-box-${properties.currentIndex}`,
      properties: {
        [childPropertyKey]: {
          ...properties,
          inputSize: e.target.value,
        },
      },
      type: 'date-box',
    }),
  );
};
