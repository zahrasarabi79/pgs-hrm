import AutoCompleteComponent from '@/components/shared/AutoComplete';
import { FC } from 'react';
import { StructureTreeFieldProps } from '@/types/component-types';

const StructureTreeField: FC<StructureTreeFieldProps> = ({
  errors,
  watch,
  setValue,
  errorMessage,
  register,
  formSubmitted,
  dataList,
}) => {
  return (
    <AutoCompleteComponent
      label="جایگاه سازمانی *"
      dataList={dataList}
      noOptionsText="dd"
      optionName="label"
      watch={watch}
      name="organizationalStructureId"
      errors={errors}
      setValue={setValue}
      register={register}
      formSubmitted={formSubmitted}
      errorMessage={errorMessage}
    />
  );
};
export default StructureTreeField;
