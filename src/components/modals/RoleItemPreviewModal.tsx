import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { RoleRes } from '@/state-management/apis/types';
import { renderOrganizationalPath } from '@/components/pages/role/utils';

export const typographyStyle = {
  borderBottom: 1,
  borderColor: 'GrayText',
  color: 'GrayText',
  py: 1.6,
  wordBreak: 'break-all',
};

const RoleItemPreviewModal: FC<{ item: RoleRes['data'][0] }> = ({ item }) => {
  const { rank, requiredEmployeesCount, positionName, description } = item;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          سمت سازمانی: <span style={{ color: '#fff', marginRight: 1 }}>{positionName.value}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          جایگاه سازمانی:{' '}
          <span style={{ color: '#fff', marginRight: 1 }}>{renderOrganizationalPath(item)}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          رتبه: <span style={{ color: '#fff', marginRight: 1 }}>{rank}</span>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          تعداد: <span style={{ color: '#fff', marginRight: 1 }}>{requiredEmployeesCount}</span>
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
export default RoleItemPreviewModal;
