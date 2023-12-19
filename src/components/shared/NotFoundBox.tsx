import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { NotFoundBoxProps } from '@/components/shared/ITypes';

const NotFoundBox: FC<NotFoundBoxProps> = ({ title }) => {
  return (
    <Box
      sx={{
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '65vh',
        gap: 3,
      }}
      role="not-found-box"
    >
      <Typography sx={{ fontSize: '20px' }}>{title}</Typography>
      <Image
        priority
        alt="Logo"
        src="/not-found-box.svg"
        width={350}
        height={250}
        style={{ display: 'flex' }}
      />
    </Box>
  );
};

export default NotFoundBox;
