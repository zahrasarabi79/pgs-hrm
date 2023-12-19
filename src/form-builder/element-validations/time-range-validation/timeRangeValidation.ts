import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleTimeRangeChangeRequired = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  childrenPropertyKey: 'from' | 'to' | 'calender',
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const validations = elementProperties[listId][currentIndex]?.validations;

  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          hourly:
            childrenPropertyKey === 'from'
              ? {
                  ['to']: {
                    ...validations?.hourly['to'],
                  },
                  ['calender']: {
                    ...validations?.hourly['calender'],
                  },
                  [childrenPropertyKey]: {
                    ...validations?.hourly[childrenPropertyKey],
                    isRequired: e.target.checked,
                  },
                }
              : childrenPropertyKey === 'to'
                ? {
                    ['from']: {
                      ...validations?.hourly['from'],
                    },
                    ['calender']: {
                      ...validations?.hourly['calender'],
                    },
                    [childrenPropertyKey]: {
                      ...validations?.hourly[childrenPropertyKey],
                      isRequired: e.target.checked,
                    },
                  }
                : {
                    ['from']: {
                      ...validations?.hourly['from'],
                    },
                    ['to']: {
                      ...validations?.hourly['to'],
                    },
                    [childrenPropertyKey]: {
                      ...validations?.hourly[childrenPropertyKey],
                      isRequired: e.target.checked,
                    },
                  },
        },
      }),
    );
};

export const handleChangeDisablePast = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  childrenPropertyKey: 'from' | 'to' | 'calender',
  propertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          [propertyKey]: {
            [childrenPropertyKey === 'from' ? 'to' : 'from']: {
              ...validations[propertyKey][childrenPropertyKey === 'from' ? 'to' : 'from'],
            },
            [childrenPropertyKey]: {
              ...validations[propertyKey][childrenPropertyKey],
              isPastDisabled: e.target.checked,
            },
          },
        },
      }),
    );
};

export const handleChangeDisabledPastDays = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  childrenPropertyKey: 'from' | 'to' | 'calender',
  propertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          [propertyKey]: {
            [childrenPropertyKey === 'from' ? 'to' : 'from']: {
              ...validations[propertyKey][childrenPropertyKey === 'from' ? 'to' : 'from'],
            },
            [childrenPropertyKey]: {
              ...validations[propertyKey][childrenPropertyKey],
              disabledPastDays: e.target.value,
            },
          },
        },
      }),
    );
};

export const handleChangeDisableFuture = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  childrenPropertyKey: 'from' | 'to' | 'calender',
  propertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          [propertyKey]: {
            [childrenPropertyKey === 'from' ? 'to' : 'from']: {
              ...validations[propertyKey][childrenPropertyKey === 'from' ? 'to' : 'from'],
            },
            [childrenPropertyKey]: {
              ...validations[propertyKey][childrenPropertyKey],
              isFutureDisabled: e.target.checked,
            },
          },
        },
      }),
    );
};

export const handleChangeDisabledFutureDays = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  childrenPropertyKey: 'from' | 'to' | 'calender',
  propertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          [propertyKey]: {
            [childrenPropertyKey === 'from' ? 'to' : 'from']: {
              ...validations[propertyKey][childrenPropertyKey === 'from' ? 'to' : 'from'],
            },
            [childrenPropertyKey]: {
              ...validations[propertyKey][childrenPropertyKey],
              disabledFutureDays: e.target.value,
            },
          },
        },
      }),
    );
};
export const handleSelectDisableDays = (
  dispatch: Dispatch,
  properties: IPropertiesState,
  selectedDays: string[],
  childrenPropertyKey: 'from' | 'to' | 'calender',
  propertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          [propertyKey]: {
            [childrenPropertyKey === 'from' ? 'to' : 'from']: {
              ...validations[propertyKey][childrenPropertyKey === 'from' ? 'to' : 'from'],
            },
            [childrenPropertyKey]: {
              ...validations[propertyKey][childrenPropertyKey],
              disabledDays: selectedDays,
            },
          },
        },
      }),
    );
};
export const disableDay = (timestamp: Date, elementValidation: any) => {
  const disabledDays = elementValidation?.disabledDays || [];
  const date = new Date(timestamp);
  return disabledDays.some((dayName: string) => {
    switch (dayName) {
      case 'شنبه':
        return date.getDay() === 6;
      case 'یکشنبه':
        return date.getDay() === 0;
      case 'دوشنبه':
        return date.getDay() === 1;
      case 'سه‌شنبه':
        return date.getDay() === 2;
      case 'چهارشنبه':
        return date.getDay() === 3;
      case 'پنجشنبه':
        return date.getDay() === 4;
      case 'جمعه':
        return date.getDay() === 5;
      default:
        return false;
    }
  });
};
export const handleChangeErrorMessages = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  nestedChildrenPropertyKey: string,
  childrenPropertyKey: 'from' | 'to' | 'calender',
  propertyKey: string,
) => {
  const { listId, currentIndex, elementProperties } = properties;
  const { validations } = elementProperties[listId][currentIndex];
  properties.id &&
    dispatch(
      updateElementProperties({
        id: properties.id,
        type: 'date-box',
        uniqueName: `date-box-${properties.currentIndex}`,
        validations: {
          [propertyKey]:
            childrenPropertyKey == 'from'
              ? {
                  ['to']: {
                    ...validations[propertyKey]['to'],
                  },
                  ['calender']: {
                    ...validations[propertyKey]['calender'],
                  },
                  [childrenPropertyKey]: {
                    ...validations[propertyKey][childrenPropertyKey],
                    errorMessages: {
                      ...validations[propertyKey][childrenPropertyKey].errorMessages,
                      [nestedChildrenPropertyKey]: e.target.value,
                    },
                  },
                }
              : childrenPropertyKey == 'to'
                ? {
                    ['from']: {
                      ...validations[propertyKey]['from'],
                    },
                    ['calender']: {
                      ...validations[propertyKey]['calender'],
                    },
                    [childrenPropertyKey]: {
                      ...validations[propertyKey][childrenPropertyKey],
                      errorMessages: {
                        ...validations[propertyKey][childrenPropertyKey].errorMessages,
                        [nestedChildrenPropertyKey]: e.target.value,
                      },
                    },
                  }
                : {
                    ['from']: {
                      ...validations[propertyKey]['from'],
                    },
                    ['to']: {
                      ...validations[propertyKey]['to'],
                    },
                    [childrenPropertyKey]: {
                      ...validations[propertyKey][childrenPropertyKey],
                      errorMessages: {
                        ...validations[propertyKey][childrenPropertyKey].errorMessages,
                        [nestedChildrenPropertyKey]: e.target.value,
                      },
                    },
                  },
        },
      }),
    );
};

export const differenceInDays = (
  fromDate: string | number | Date,
  toDate: string | number | Date,
) => {
  const fromDateTimestamp = new Date(fromDate).getTime();
  const toDateTimestamp = new Date(toDate).getTime();

  const differenceInMilliseconds = toDateTimestamp - fromDateTimestamp;
  return differenceInMilliseconds / (1000 * 60 * 60 * 24);
};
