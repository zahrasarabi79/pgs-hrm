import React from 'react';
import Box from '@mui/material/Box';
import { useAppSelector } from '@/state-management/store/store';
import TextBoxValidations from '@/form-builder/element-validations/TextBoxValidations';
import TextAreaBoxValidation from '@/form-builder/element-validations/TextAreaBoxValidation';
import DateRangeValidation from '@/form-builder/element-validations/date-range-validation/DateRangeValidation';
import TimeRangeValidation from '@/form-builder/element-validations/time-range-validation/TimeRangeValidation';
import TimeBoxValidations from '@/form-builder/element-validations/TimeBoxValidations';
import NoContent from '@/form-builder/components/NoContent';

const ElementValidations = () => {
  const properties = useAppSelector((state) => state?.properties);

  const renderViewValidations = () => {
    switch (properties?.propertyType) {
      case 'text-box':
        return <TextBoxValidations />;
      case 'text-area-box':
        return <TextAreaBoxValidation />;
      case 'date-range-box':
        return <DateRangeValidation />;
      case 'time-range-box':
        return <TimeRangeValidation />;
      case 'time-box':
        return <TimeBoxValidations />;
      default:
        return <NoContent text="اعتبارسنجی وجود ندارد" />;
    }
  };
  return (
    <Box sx={{ flex: 1 }}>
      {!properties?.elementProperties[properties.listId][properties.currentIndex]?.id ? (
        <NoContent text="اعتبارسنجی وجود ندارد" />
      ) : (
        renderViewValidations()
      )}
    </Box>
  );
};

export default ElementValidations;
