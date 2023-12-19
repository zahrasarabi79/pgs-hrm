import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { workflowStatusData } from '@/state-management/apis/types';
import { convertStatusToPersian } from '@/components/tables/WorkflowStatusListTable/utils';

interface WorkflowStatusPreviewModalProps {
  item: workflowStatusData;
}
export const typographyStyle = {
  borderBottom: 1,
  borderColor: 'GrayText',
  color: 'GrayText',
  py: 1.6,
  wordBreak: 'break-all',
};

const WorkflowStatusPreviewModal: FC<WorkflowStatusPreviewModalProps> = ({ item }) => {
  if (!item) return null;
  const { name, description, type } = item;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            وضعیت:{' '}
            <span style={{ color: '#fff', marginRight: 1 }}>{convertStatusToPersian(type)}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            نام: <span style={{ color: '#fff', marginRight: 1 }}>{name.value}</span>
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            توضیحات:{' '}
            <span style={{ color: '#fff', marginRight: 1 }}>{description?.value || '_'}</span>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default WorkflowStatusPreviewModal;
