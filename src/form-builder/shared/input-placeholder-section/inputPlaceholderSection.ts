import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangePlaceholder = (
  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  dispatch: Dispatch,
  properties: IPropertiesState,
  name: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `${name}-${properties.currentIndex}`,
      properties: { inputPlaceholder: e.target.value },
      type: name,
    }),
  );
};
