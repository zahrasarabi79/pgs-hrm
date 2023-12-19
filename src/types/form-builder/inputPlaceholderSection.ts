import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { DefaultInputStyles } from '@/types/form-builder/root';
import { IPropertiesState } from '@/state-management/slices/propertiesSlice';

export interface InputPlaceholderSectionProps extends DefaultInputStyles {
  handleChangePlaceholder: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dispatch: Dispatch,
    properties: IPropertiesState,
    name: string,
  ) => void;
}
