import { Card, CardContent, Divider, Slide, Typography } from '@mui/material';
import LoginForm from '@/components/forms/login/LoginForm';
import { useRef, useState } from 'react';

export const LoginCard = ({ checked }) => {
  const containerRef = useRef(null);
  const [checkedSlide, setCheckedSlide] = useState(false);

  return (
    <Card sx={{ bgcolor: '#FDFDFD', margin: '16px', p: '12px 25px' }} >
      <CardContent sx={{ p: 0 }}>
        {!checked ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                textAlign: 'center',
                color: '#1D1B1C',
                pb: '12px',
                fontWeight: '700',
              }}
            >
              خوش آمدید
            </Typography>
            <Divider flexItem sx={{ pb: 2 }}>
              <Typography
                sx={{
                  textAlign: 'center',
                  color: '#1D1B1C',
                }}
              >
                وارد پنل کاربری خود شوید
              </Typography>
            </Divider>

            <LoginForm setCheckedSlide={setCheckedSlide} />
          </div>
        ) : (
          <Slide direction="left" in={checkedSlide} >
            <Typography variant="body1" color="initial">
              sallam
            </Typography>
          </Slide>
        )}
      </CardContent>
      <CardContent sx={{ p: 0 }}></CardContent>
    </Card>
  );
};
