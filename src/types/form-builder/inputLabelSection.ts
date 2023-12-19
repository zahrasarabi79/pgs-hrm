import { Dispatch } from 'redux';
import { ChangeEvent } from 'react';
import { DefaultInputStyles } from '@/types/form-builder/root';
import { IPropertiesState } from '@/state-management/slices/propertiesSlice';

export interface InputLabelSectionProps extends DefaultInputStyles {
  handleChangeLabel: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dispatch: Dispatch,
    properties: IPropertiesState,
    name: string,
  ) => void;
}
