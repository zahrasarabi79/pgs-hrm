import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { TextAreaBoxProps } from '@/types/form-builder/textAreaBox';
import { useAppSelector } from '@/state-management/store/store';

const TextAreaBox: FC<TextAreaBoxProps> = ({ control, index, errors }) => {
  const properties = useAppSelector((state) => state?.properties);
  const elementStyles = properties.elementProperties[properties.listId][index]?.properties;
  const elementValidations = properties.elementProperties[properties.listId][index]?.validations;
  const name =
    properties.elementProperties[properties.listId][properties.currentIndex]?.uniqueName +
      index +
      1 || '';

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: elementValidations?.required?.value,
          message: elementValidations?.required?.message || 'این فیلد الزامی است',
        },
        minLength: {
          value: elementValidations?.min?.value,
          message: elementValidations?.min?.message || 'کمتر از یک کاراکتر نباشد',
        },
        maxLength: {
          value: elementValidations?.max?.value,
          message: elementValidations?.max?.message || 'بیشتر از بیست کاراکتر نباشد',
        },
      }}
      render={({ field }) => (
        <TextField
          {...field}
          fullWidth
          multiline
          minRows={elementStyles?.minRows || '2'}
          maxRows={elementStyles?.maxRows}
          label={elementStyles?.inputLabel || ` عنوان ${index + 1}`}
          variant={elementStyles?.inputVariant || 'outlined'}
          placeholder={elementStyles?.inputPlaceholder || `نگه دارنده مکان ${index + 1}`}
          error={Boolean(errors[name])}
          helperText={Boolean(errors[name]?.message) && (errors[name]?.message as string)}
        />
      )}
    />
  );
};
export default TextAreaBox;
