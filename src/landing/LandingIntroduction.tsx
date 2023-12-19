import { Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
const LandingIntroduction = () => {
  const theme = useTheme();
  const isDownSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Grid item sx={{ direction: 'rtl', mb: '5px' }} xs={isDownSmallScreen ? 12 : 6}>
      <Typography
        sx={{
          fontSize: isDownSmallScreen ? '30px' : isDownMediumScreen ? '42px' : '98px',
          fontWeight: '700',
          lineHeight: isDownSmallScreen ? '50px' : isDownMediumScreen ? '60px' : '125px',
          color: '#FDFDFD',
          textAlign: 'left',
        }}
      >
        سیستم مدیریت
        <br />
        فرایند کسب و‌کار <span style={{ color: '#AEE9FF' }}>پویاگران </span>
      </Typography>
      <Typography
        sx={{
          fontSize: isDownMediumScreen ? '12px' : '14px',
          fontWeight: '400',
          lineHeight: isDownMediumScreen ? '20px' : '25px',
          color: '#FDFDFD',
          textAlign: 'left',
        }}
      >
        پیشبرد سازمانی و افزایش سطح هوشمندی با ماژول‌های؛ مدیریت منابع انسانی، مدیریت زنجیره تامین،
        مدیریت ارتباط با مشتریان، مدیریت مالی و حسابداری، در یک نگاه با بهبود کارایی و افزایش
        توانمندی‌های سازمانی، تبدیل به محوری جهت ارتقاء عملکرد و بهره‌وری گردیده است.
      </Typography>
    </Grid>
  );
};

export default LandingIntroduction;
