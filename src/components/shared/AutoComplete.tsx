'use client';
import { FC, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { AutoCompleteComponentProps, OptionType } from '@/types/component-types';
import { useAppDispatch } from '@/state-management/store/store';
import { setOrganizationLevel } from '@/state-management/slices/organizationLevelSlice';

const AutoCompleteComponent: FC<AutoCompleteComponentProps> = ({
  label,
  variant = 'outlined',
  disabled = false,
  readOnly = false,
  disabledIndices = [],
  dataList,
  noOptionsText,
  optionName,
  name,
  errors,
  errorMessage,
  setValue,
  watch,
  additionalKeys,
  register,
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataList) {
      setOptions(
        dataList.map((item, index) => {
          const option: OptionType = {
            label: item?.[optionName],
            id: item?.id || index,
          };
          additionalKeys?.forEach((key) => {
            option[key] = item?.[key];
          });

          return option;
        }),
      );
    }
  }, [dataList, optionName, additionalKeys]);

  const selectedValue = watch(name);

  return (
    <>
      <Autocomplete
        dir={'rtl'}
        options={options}
        disabled={disabled}
        readOnly={readOnly}
        value={
          selectedValue
            ? options.find((option) => option.id === selectedValue[0]?.id) || null
            : null
        }
        noOptionsText={noOptionsText}
        getOptionDisabled={(option) => disabledIndices.includes(options.indexOf(option as any))}
        getOptionLabel={(option: any) => option.label || ''}
        {...register(name, { required: 'این فیلد الزامی است' })}
        renderInput={(params) => (
          <TextField
            variant={variant}
            {...params}
            label={label}
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password',
            }}
            error={Boolean(errors)}
            helperText={errors ? errorMessage : ' '}
          />
        )}
        isOptionEqualToValue={(option: any, value: any) => option.id === value?.id}
        onChange={(_, newValue) => {
          setValue(name, [newValue], { shouldValidate: true, shouldDirty: true });
        }}
        onInputChange={(_, value) =>
          dispatch(setOrganizationLevel({ name: { _: 'StaticText', value } }))
        }
      />
    </>
  );
};

export default AutoCompleteComponent;
