import { FC } from 'react';
import AutoCompleteComponent from '@/components/shared/AutoComplete';
import { OrganizationLevelFieldProps } from '@/types/component-types';
import { useGetOrganizationLevelsBriefQuery } from '@/state-management/apis/organizationLevelApi';
import NotFoundOrganizationLevel from '@/components/forms/role-modifier/NotFoundOrganizationLevel';

const OrganizationLevelField: FC<OrganizationLevelFieldProps> = ({
  watch,
  setValue,
  errors,
  errorMessage,
  register,
  formSubmitted,
}) => {
  const { data } = useGetOrganizationLevelsBriefQuery();

  const organizationLevelData = data?.data.map((item) => ({
    label: item?.name.value,
    id: item?.id,
  }));
  return (
    <AutoCompleteComponent
      label="سمت سازمانی *"
      formSubmitted={formSubmitted}
      dataList={organizationLevelData as any[]}
      noOptionsText={<NotFoundOrganizationLevel />}
      optionName="label"
      watch={watch}
      name="positionId"
      errors={errors}
      setValue={setValue}
      register={register}
      errorMessage={errorMessage}
    />
  );
};
export default OrganizationLevelField;
