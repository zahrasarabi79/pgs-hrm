import { SelectChangeEvent } from '@mui/material';
import { Dispatch } from 'redux';
import {
  IPropertiesState,
  updateElementProperties,
} from '@/state-management/slices/propertiesSlice';

export const handleChangeVariant = (
  e: SelectChangeEvent,
  dispatch: Dispatch,
  properties: IPropertiesState,
  name: string,
) => {
  dispatch(
    updateElementProperties({
      id: properties.id,
      uniqueName: `${name}-${properties.currentIndex}`,
      properties: { inputVariant: e.target.value },
      type: name,
    }),
  );
};
