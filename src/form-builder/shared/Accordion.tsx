import React, { FC, ReactNode } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, SxProps } from '@mui/material';
import ArrowBackIosSharp from '@mui/icons-material/ArrowBackIosSharp';

export interface CustomAccordionProps {
  summaryContent: ReactNode;
  detailsContent: ReactNode;
  style?: SxProps;
}

const CustomAccordion: FC<CustomAccordionProps> = ({
  summaryContent,
  detailsContent,
  style = {
    width: '100%',
    '&.MuiAccordion-root:before': { opacity: '0 !important' },
  },
}) => {
  return (
    <Accordion elevation={0} disableGutters sx={style}>
      <AccordionSummary
        aria-controls="content"
        id="content-header"
        expandIcon={<ArrowBackIosSharp sx={{ fontSize: '0.9rem' }} />}
        sx={{
          // backgroundColor: 'rgba(255, 255, 255, .05)',
          flexDirection: 'row',
          '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
          },
        }}
      >
        {summaryContent}
      </AccordionSummary>
      <AccordionDetails>{detailsContent}</AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
