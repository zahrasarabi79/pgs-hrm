import React, { FC, ReactNode, useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { Controller, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { OptionType } from '@/types/component-types';

interface MultiSelectAutoCompleteProps {
  label: string;
  variant?: 'standard' | 'outlined' | 'filled';
  disabled?: boolean;
  readOnly?: boolean;
  disabledIndices?: number[];
  dataList: any[]; // data type can be any kind of data
  noOptionsText: string | ReactNode;
  optionName: string;
  watch: UseFormWatch<any>;
  name: string;
  errors: boolean;
  errorMessage?: string;
  setValue: UseFormSetValue<any>;
  multiple?: boolean;
  formSubmitted: boolean;
  additionalKeys?: string[];
  register: any;
  control: any;
}

const MultiSelectAutoComplete: FC<MultiSelectAutoCompleteProps> = ({
  dataList,
  optionName,
  setValue,
  errors,
  errorMessage,
  additionalKeys,
  name,
  noOptionsText,
  label,
  control,
  watch,
}) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    if (dataList && initialRender) {
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
    // render the component just only after options generated
    setInitialRender(false);
  }, [dataList, optionName, additionalKeys, initialRender]);

  if (initialRender) {
    return null;
  }
  return (
    <>
      <Controller
        name={name}
        key={Math.random()}
        control={control}
        rules={{ required: 'این فیلد الزامی است' }}
        render={({ field }) => (
          <Autocomplete
            filterSelectedOptions
            {...field}
            multiple
            value={watch(name) ? [...watch(name)] : []}
            options={options}
            noOptionsText={noOptionsText}
            getOptionLabel={(option: any) => option?.label || ''}
            renderInput={(params) => (
              <TextField
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
            onChange={(_, newValue, _reason) => {
              setValue(name, newValue, { shouldDirty: true, shouldValidate: true });
            }}
          />
        )}
      />
    </>
  );
};

export default MultiSelectAutoComplete;
