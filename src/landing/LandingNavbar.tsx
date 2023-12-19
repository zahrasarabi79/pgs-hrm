'use client';
import {
  Box,
  Grid,
  Divider,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  styled,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';
import Icon from '@/landing/shared/Icon';

const LandingNavbar = () => {
  const theme = useTheme();
  const isDownSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMedumeScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [isHovered, setIsHovered] = useState(false);
  const NavbarButton = styled(Button)(({ theme }) => ({
    minWidth: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #FDFDFD',
    '&:hover': {
      bgcolor: 'rgba(253, 253, 253, 0.10)',
      border: '2px solid #AEE9FF',
      boxShadow: ' 0px 5px 35px 0px rgba(174, 233, 255, 0.25);',
      '.navbarButton-icon': { backgroundColor: '#AEE9FF' },
    },
    [theme.breakpoints.down('sm')]: {
      width: '30px',
      height: '30px',
      borderRadius: '12px',
      bgcolor: 'rgba(253, 253, 253, 0.20)',
      '.navbarButton-icon': { height: '20px', width: '20px', WebkitMaskSize: '20px' },
    },
    [theme.breakpoints.down('md')]: {
      width: '25px',
      height: '25px',
      borderRadius: '6px',
      bgcolor: 'rgba(253, 253, 253, 0.20)',
      '.navbarButton-icon': { height: '16px', width: '16px', WebkitMaskSize: '16px' },
    },
    [theme.breakpoints.up('md')]: {
      width: '45px',
      height: '45px',
      borderRadius: '12px',
      bgcolor: 'rgba(253, 253, 253, 0.20)',
      '.navbarButton-icon': { height: '30px', width: '30px', WebkitMaskSize: '30px' },
    },
  }));

  return (
    <Grid item xs={12} dir={'ltr'}>
      <Stack sx={{ py: isDownSmallScreen ? '39px' : isDownMedumeScreen ? '26px' : '29px' }}>
        <Grid container sx={{ flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
          <Grid
            item
            xs="auto"
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box
              className="thumb-box"
              sx={{
                width: isDownSmallScreen ? '40px' : isDownMedumeScreen ? '36px' : '65px',
                height: isDownSmallScreen ? '40px' : isDownMedumeScreen ? '36px' : '65px',
                bgcolor: 'rgba(253, 253, 253, 0.20)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                className="thumb-icon"
                pathName="../icons/landing-icon/pouyagaran.svg"
                size={isDownSmallScreen ? '20px' : isDownMedumeScreen ? '22.2px' : '30px'}
                color="white"
              />
            </Box>
            <Divider orientation="vertical" sx={{ mx: '10px' }} />
          </Grid>
          <Grid
            item
            xs="auto"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isDownMedumeScreen ? '8.3px' : '15px',
            }}
          >
            <NavbarButton>
              <Icon
                className="navbarButton-icon"
                pathName="../icons/landing-icon/UserRounded.svg"
                color="white"
              />
            </NavbarButton>

            {!isDownSmallScreen && (
              <>
                <NavbarButton>
                  <Icon
                    className="navbarButton-icon"
                    pathName="../icons/landing-icon/notification.svg"
                    color="white"
                  />
                </NavbarButton>
                <NavbarButton>
                  <Icon
                    className="navbarButton-icon"
                    pathName="../icons/landing-icon/Dialog.svg"
                    color="white"
                  />
                </NavbarButton>
              </>
            )}
          </Grid>
          <Grid item xs sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Button
              className="thumb-box"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{
                width: 'auto',
                height: isDownMedumeScreen ? '36px' : '45px',
                bgcolor: 'rgba(253, 253, 253, 0.20)',
                borderRadius: '12px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: '1px solid #FDFDFD',
                padding: isDownMedumeScreen ? '8px 12px' : '10px 15px',
                gap: isDownMedumeScreen ? 1 : '10px',
                '&:hover': {
                  bgcolor: '#AEE9FF',
                  boxShadow: ' 0px 5px 35px 0px rgba(174, 233, 255, 0.25);',
                  border: 'none',
                  '.contact-us-typography': { color: '#1D1B1C' },
                  '.button-OutgoingCallRounded-icon': { backgroundColor: '#1D1B1C' },
                },
              }}
            >
              <Icon
                className="button-OutgoingCallRounded-icon"
                pathName={
                  isHovered
                    ? '../icons/landing-icon/OutgoingCallRoundedHover.svg'
                    : '../icons/landing-icon/OutgoingCallRounded.svg'
                }
                size={isDownMedumeScreen ? '20px' : '25px'}
                color="white"
              />
              <Typography
                className="contact-us-typography"
                color="white"
                sx={{
                  fontSize: isDownMedumeScreen ? '10px' : '12px',
                  fontWeight: 400,
                  lineHeight: '15px',
                }}
              >
                با ما تماس بگیرید
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Grid>
  );
};

export default LandingNavbar;
