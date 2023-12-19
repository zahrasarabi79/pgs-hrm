import React, { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import ArrowBackIosSharp from '@mui/icons-material/ArrowBackIosSharp';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { Accordion } from '@mui/material';
import { ISidebarItems } from '@/public/data/otherData';
import { useAppDispatch } from '@/state-management/store/store';
import { setSidebarElementType } from '@/state-management/slices/sidebarElementTypeSlice';
import FormBuilderSidebarAccordionItems from '@/form-builder/components/FormBuilderSidebarAccordionItems';

export interface SidebarItemsProps {
  sidebarItem: ISidebarItems;
  index: number;
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<ArrowBackIosSharp sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
}));

const FormBuilderSideBarItem: FC<SidebarItemsProps> = ({ sidebarItem, index }) => {
  const [elTypes, setElTypes] = useState('');
  const [expanded, setExpanded] = useState<number | false>(false);

  const dispatch = useAppDispatch();

  const handleChange = (index: number) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? index : false);
    setElTypes(sidebarItem.label);
    dispatch(setSidebarElementType(sidebarItem.label));
  };

  return (
    <Accordion
      elevation={0}
      square
      disableGutters
      expanded={expanded === index}
      onChange={handleChange(index)}
    >
      <AccordionSummary aria-controls="content" id="content-header">
        {sidebarItem.label}
      </AccordionSummary>
      <FormBuilderSidebarAccordionItems elTypes={elTypes} />
    </Accordion>
  );
};
export default FormBuilderSideBarItem;
