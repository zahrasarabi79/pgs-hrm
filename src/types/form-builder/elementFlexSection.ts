import { ChangeEvent } from 'react';
import { Dispatch } from 'redux';
import { IPropertiesState } from '@/state-management/slices/propertiesSlice';
import { DefaultInputStyles } from '@/types/form-builder/root';

export interface ElementFlexSectionProps extends DefaultInputStyles {
  handleChangeFlex: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dispatch: Dispatch,
    properties: IPropertiesState,
    name: string,
  ) => void;
}
