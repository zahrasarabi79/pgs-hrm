import { Dispatch } from 'redux';
import { SelectChangeEvent } from '@mui/material';
import { DefaultInputStyles } from '@/types/form-builder/root';
import { IPropertiesState } from '@/state-management/slices/propertiesSlice';

export interface InputVariantSectionProps extends DefaultInputStyles {
  handleChangeOption: (
    e: SelectChangeEvent,
    dispatch: Dispatch,
    properties: IPropertiesState,
    name: string,
  ) => void;
}
