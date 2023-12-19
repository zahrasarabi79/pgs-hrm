import { SelectChangeEvent } from '@mui/material';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangeOption = (
  e: SelectChangeEvent,
  dispatch: Dispatch,
  properties: IPropertiesState,
  name: string,
  propertyKey: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `${name}-${properties.currentIndex}`,
      properties: { [propertyKey]: e.target.value },
      type: name,
    }),
  );
};
