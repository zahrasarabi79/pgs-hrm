import { Control, FieldErrors } from 'react-hook-form';

export interface TextBoxProps {
  control: Control;
  index: number;
  errors: FieldErrors;
}
