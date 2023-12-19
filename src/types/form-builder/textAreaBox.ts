import { Control, FieldErrors } from 'react-hook-form';

export interface TextAreaBoxProps {
  control: Control;
  index: number;
  errors: FieldErrors;
}
