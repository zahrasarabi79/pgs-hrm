import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleColor = (
  dispatch: Dispatch,
  properties: IPropertiesState,
  name: string,
  color: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `${name}-${properties?.currentIndex}`,
      type: name,
      properties: {
        color,
      },
    }),
  );
};
