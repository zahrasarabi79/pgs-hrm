import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChange = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  name: string,
  propertyKey: string,
  rootPropertyKey: string,
  message?: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `${name}-${properties.currentIndex}`,
      type: name,
      [rootPropertyKey]: {
        [propertyKey]:
          rootPropertyKey === 'validations'
            ? {
                value: e.target.value,
                message,
              }
            : e.target.value,
      },
    }),
  );
};
