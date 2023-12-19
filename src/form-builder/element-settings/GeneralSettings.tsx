import React from 'react';
import Box from '@mui/material/Box';
import TextBoxSettings from '@/form-builder/element-settings/TextBoxSettings';
import TextAreaBoxSettings from '@/form-builder/element-settings/TextAreaBoxSettings';
import HeadTitleSettings from '@/form-builder/element-settings/HeadTitleSettings';
import TimeBoxSettings from '@/form-builder/element-settings/TimeBoxSettings';
import DividerSettings from '@/form-builder/element-settings/DividerSettings';
import CardFormSettings from '@/form-builder/element-settings/CardFormSettings';
import NoContent from '@/form-builder/components/NoContent';
import { useAppSelector } from '@/state-management/store/store';

const GeneralSettings = () => {
  const properties = useAppSelector((state) => state?.properties);

  const renderViewProperties = () => {
    switch (properties?.propertyType) {
      case 'text-box':
        return <TextBoxSettings />;
      case 'text-area-box':
        return <TextAreaBoxSettings />;
      case 'head-title':
        return <HeadTitleSettings />;
      case 'time-box':
        return <TimeBoxSettings />;
      case 'divider':
        return <DividerSettings />;
      case '':
        return <CardFormSettings />;
      default:
        return <NoContent text="تنظیمات کلی وجود ندارد" />;
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      {!properties?.elementProperties[properties.listId][properties.currentIndex]?.id ? (
        <NoContent text="تنظیمات کلی وجود ندارد" />
      ) : properties?.propertyType === '' ? (
        <CardFormSettings />
      ) : (
        renderViewProperties()
      )}
    </Box>
  );
};

export default GeneralSettings;
