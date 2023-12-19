import { Box, Grid, Typography } from '@mui/material';
import React, { FC } from 'react';
import Icon from '@/landing/shared/Icon';
import { ISliderImages } from '@/types/component-types';

export interface IThumbSlide {
  slide: ISliderImages;
  index: number;
  isActive: boolean;
}

const ThumbSlide: FC<IThumbSlide> = ({ slide, index, isActive }) => {
  const hoverColor = {
    border: index === 3 ? '1px solid #4CAF50' : '1px solid #aee9ff',
    thumbBox: index === 3 ? 'rgba(76, 175, 80, 0.50)' : 'rgba(174, 233, 255,0.20)',
    thumbIcon: index === 3 ? 'white' : '#aee9ff',
    fontColor: index === 3 ? '#4CAF50' : '#aee9ff',
  };
  const activeStyles = isActive && {
    transition: 'opacity 800ms easein',
    border: hoverColor.border,
    '.thumb-box': {
      bgcolor: hoverColor.thumbBox,
    },
    '.thumb-icon': {
      backgroundColor: hoverColor.thumbIcon,
    },
    '.thumb-Font-color': {
      color: hoverColor.fontColor,
    },
  };
  return (
    <>
      <Grid container sx={{ p: 1, width: '100%', height: '100%' }}>
        <Grid item xs={8}>
          <Typography
            className="thumb-Font-color"
            color="#FDFDFD"
            sx={{ fontSize: '12px', fontWeight: '700', lineHeight: '125%', textAlign: 'left' }}
          >
            {slide.name}
          </Typography>
        </Grid>
        <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
          <Box
            className="thumb-box"
            sx={{
              width: '30px',
              height: '30px',
              bgcolor: 'rgba(253, 253, 253, 0.20)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Icon className="thumb-icon" pathName={slide.icon} size="20px" color="white" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default ThumbSlide;
