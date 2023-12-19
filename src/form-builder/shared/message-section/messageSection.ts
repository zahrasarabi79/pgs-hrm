import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangeMessage = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  name: string,
  propertyKey: string,
  rootPropertyKey: string,
  value?: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      type: name,
      uniqueName: `${name}-${properties.currentIndex}`,
      [rootPropertyKey]: { [propertyKey]: { value, message: e.target.value } },
    }),
  );
};
