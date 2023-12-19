import React from 'react';
import { Box, Typography } from '@mui/material';

const NotAccessBox = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        width: '100%',
        color: 'gray',
      }}
    >
      <Typography variant="h6">شما به این بخش دسترسی ندارید</Typography>
    </Box>
  );
};

export default NotAccessBox;
