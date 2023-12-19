import { Box, Typography } from '@mui/material';
import { FC } from 'react';

const EmptyPage: FC<{ pageName: string }> = ({ pageName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        width: '100%',
        color: 'gray',
      }}
    >
      <Typography variant="h6">صفحه {pageName} در حال ساخت است .</Typography>
    </Box>
  );
};
export default EmptyPage;
