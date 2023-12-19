'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import '@/landing/style/style.css';
import { Thumbs, Keyboard } from 'swiper/modules';
import { Box, Container, Divider, Grid, Stack, useMediaQuery, useTheme } from '@mui/material';
import ThumbSlide from '../../../landing/ThumbSlide';
import LandingNavbar from '../../../landing/LandingNavbar';
import Icon from '@/landing/shared/Icon';
import LandingIntroduction from '@/landing/LandingIntroduction';
import Login from '@/components/pages/login/Login';
import { sliderImages } from '@/public/data/landingSliderData';
import { ISliderImages } from '@/types/component-types';

const Landing = () => {
  const theme = useTheme();
  const isDownSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isDownMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideClick = (index: number) => {
    if (thumbsSwiper) {
      if (sliderImages.length - 1 === index) {
        thumbsSwiper.slideTo(0);
        setActiveIndex(0);
      } else {
        thumbsSwiper.slideTo(index);
        setActiveIndex(index);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${sliderImages[activeIndex].url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
        }}
      >
        <Container
          maxWidth={false}
          sx={{ maxWidth: isDownSmallScreen ? '600px' : isDownMediumScreen ? '604px' : '1820px' }}
        >
          <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={12}>
              <LandingNavbar />
            </Grid>
            <LandingIntroduction />
            <Login />
            <Grid
              item
              xs={12}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={'auto'}
                rewind={true}
                keyboard={{
                  enabled: true,
                }}
                watchSlidesProgress={true}
                modules={[Thumbs, Keyboard]}
                className="mySwiper"
              >
                {sliderImages.map((slide: ISliderImages, index: number) => (
                  <SwiperSlide
                    key={index}
                    style={{
                      overflow: 'hidden',
                      backgroundImage: `url(${slide.url})`,
                      // boxShadow: '0px 2.284px 15.986px 0px rgba(174, 233, 255, 0.25)',
                      width: '100%',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      borderRadius: '12px',
                      ...(index === activeIndex && {
                        border: index === 3 ? '2px solid #4CAF50' : '2px solid #aee9ff',
                        '.thumb-box': {
                          bgcolor:
                            index === 3 ? 'rgba(76, 175, 80, 0.50)' : 'rgba(174, 233, 255,0.20)',
                        },
                        '.thumb-icon': {
                          backgroundColor: index === 3 ? 'white' : '#aee9ff',
                        },
                        '.thumb-Font-color': {
                          color: index === 3 ? '#4CAF50' : '#aee9ff',
                        },
                      }),
                    }}
                    onClick={() => handleSlideClick(index)}
                  >
                    <ThumbSlide slide={slide} index={index} isActive={index === activeIndex} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {!isDownSmallScreen && (
                <>
                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ mx: '20px', height: '148px' }}
                  />
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
                      '&:hover': {
                        bgcolor: 'rgba(253, 253, 253, 0.10)',
                        border: '2px solid #AEE9FF',
                        boxShadow: ' 0px 5px 35px 0px rgba(174, 233, 255, 0.25);',
                        '.Arrow-icon': { backgroundColor: '#AEE9FF' },
                      },
                    }}
                  >
                    <Icon
                      className="Arrow-icon"
                      pathName="/icons/landing-icon/AltArrowRight.svg"
                      size="20px"
                      color="white"
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Landing;
