import React, { FC } from 'react';
import { HierarchyData } from '@/state-management/apis/types';
import { Grid, Typography } from '@mui/material';

interface HierarchyItemPreviewModalProps {
  hierarchyItem: HierarchyData;
}
export const typographyStyle = {
  borderBottom: 1,
  borderColor: 'GrayText',
  color: 'GrayText',
  py: 1.6,
  wordBreak: 'break-all',
};

const HierarchyItemPreviewModal: FC<HierarchyItemPreviewModalProps> = ({ hierarchyItem }) => {
  if (!hierarchyItem) return null;
  const { name, description, rank } = hierarchyItem;
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            نام: <span style={{ color: '#fff', marginRight: 1 }}>{name.value}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            رتبه: <span style={{ color: '#fff', marginRight: 1 }}>{rank.toLocaleString()}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            توضیحات: <span style={{ color: '#fff', marginRight: 1 }}>{description?.value}</span>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default HierarchyItemPreviewModal;
