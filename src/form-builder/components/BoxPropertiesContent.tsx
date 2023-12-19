import React from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import GeneralSettings from '@/form-builder/element-settings/GeneralSettings';
import ElementValidations from '@/form-builder/element-validations/ElementValidations';
import ElementStyles from '@/form-builder/element-styles/ElementStyles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ my: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const BoxPropertiesContent = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '340px' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="تنظیمات کلی" {...a11yProps(0)} />
          <Tab label="تنظیمات ظاهری" {...a11yProps(1)} />
          <Tab label="اعتبارسنجی" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <GeneralSettings />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ElementStyles />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <ElementValidations />
      </CustomTabPanel>
    </Box>
  );
};
export default BoxPropertiesContent;
