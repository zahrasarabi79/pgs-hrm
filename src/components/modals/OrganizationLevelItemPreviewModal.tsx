import React, { FC } from 'react';
import { OrganizationLevelsRes } from '@/state-management/apis/types';
import { Grid, Typography } from '@mui/material';

export const typographyStyle = {
  borderBottom: 1,
  borderColor: 'GrayText',
  color: 'GrayText',
  py: 1.6,
  wordBreak: 'break-all',
};

const OrganizationLevelItemPreviewModal: FC<{ item: OrganizationLevelsRes['data'][0] }> = ({
  item,
}) => {
  const { name, description } = item;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          نام: <span style={{ color: '#fff', marginRight: 1 }}>{name.value}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          توضیحات:{' '}
          <span style={{ color: '#fff', marginRight: 1 }}>{description?.value || '__'}</span>
        </Typography>
      </Grid>
    </Grid>
  );
};
export default OrganizationLevelItemPreviewModal;
