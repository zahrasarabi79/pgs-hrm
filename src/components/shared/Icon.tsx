'use client';
import { Box } from '@mui/material';
import React, { FC } from 'react';
import { IconProps } from '@/components/shared/ITypes';

const Icon: FC<IconProps> = ({ pathName, color = 'white', size = 24 }) => {
  return (
    <Box
      component="div"
      sx={{
        maskImage: `url('/icons/${pathName}')`,
        WebkitMaskImage: `url('/icons/${pathName}')`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskSize: size,
        backgroundColor: color,
        width: size,
        height: size,
      }}
    />
  );
};

export default Icon;
