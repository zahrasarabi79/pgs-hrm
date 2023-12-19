import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';
import { StructureData } from '@/state-management/apis/types';
import { BreadCrumb } from '@/components/shared';

interface StructureItemPreviewModalProps {
  structureItem: StructureData;
}
export const typographyStyle = {
  borderBottom: 1,
  borderColor: 'GrayText',
  color: 'GrayText',
  py: 1.6,
  wordBreak: 'break-all',
};

const StructureItemPreviewModal: FC<StructureItemPreviewModalProps> = ({ structureItem }) => {
  if (!structureItem) return null;
  const { name, description, path, organizationalHierarchyName } = structureItem;

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            سلسله مراتب:{' '}
            <span style={{ color: '#fff', marginRight: 1 }}>
              {organizationalHierarchyName.value}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            نام: <span style={{ color: '#fff', marginRight: 1 }}>{name.value}</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" sx={typographyStyle}>
            جایگاه سازمانی:{' '}
            <span style={{ color: '#fff', marginRight: 1 }}>
              {path ? <BreadCrumb items={path} /> : 'سطح اول'}
            </span>
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

export default StructureItemPreviewModal;
