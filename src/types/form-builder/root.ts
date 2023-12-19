import { Dispatch } from 'redux';
import { Control } from 'react-hook-form';
import { IPropertiesState } from '@/state-management/slices/propertiesSlice';

export interface DefaultInputStyles {
  properties: IPropertiesState;
  dispatch: Dispatch;
  name: string;
}

export interface DefaultElementProps {
  control?: Control;
  index: number;
}
