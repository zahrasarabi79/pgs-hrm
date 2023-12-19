import React from 'react';
import Box from '@mui/material/Box';
import { useAppSelector } from '@/state-management/store/store';
import TextBoxStyles from '@/form-builder/element-styles/TextBoxStyles';
import TextAreaBoxStyles from '@/form-builder/element-styles/TextAreaBoxStyles';
import DateRangeStyles from '@/form-builder/element-styles/date-range-styles/DateRangeStyles';
import { HeadTitleStyles } from '@/form-builder/element-styles/head-title-styles/HeadTitleStyles';
import TimeRangeStyles from '@/form-builder/element-styles/TimeRangeStyles';
import TimeBoxStyles from '@/form-builder/element-styles/TimeBoxStyles';
import NoContent from '@/form-builder/components/NoContent';
import CardFormStyles from '@/form-builder/element-styles/CardFormStyles';

const ElementStyles = () => {
  const properties = useAppSelector((state) => state?.properties);

  const renderViewProperties = () => {
    switch (properties?.propertyType) {
      case 'text-box':
        return <TextBoxStyles />;
      case 'text-area-box':
        return <TextAreaBoxStyles />;
      case 'date-range-box':
        return <DateRangeStyles />;
      case 'head-title':
        return <HeadTitleStyles />;
      case 'time-range-box':
        return <TimeRangeStyles />;
      case 'time-box':
        return <TimeBoxStyles />;
      default:
        return <NoContent text="تنظیمات ظاهری وجود ندارد" />;
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      {!properties?.elementProperties[properties.listId][properties.currentIndex]?.id ? (
        <NoContent text="تنظیمات ظاهری وجود ندارد" />
      ) : properties?.propertyType === '' ? (
        <CardFormStyles />
      ) : (
        renderViewProperties()
      )}
    </Box>
  );
};

export default ElementStyles;
