'use client';
import { Container, Grid, useMediaQuery, useTheme } from '@mui/material';
import { LoginCard } from '@/components/pages/login/LoginCard';

const Login = () => {
  const theme = useTheme();
  const isDownSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid
      item
      xs={isDownSmallScreen ? 12 : 6}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0 }}
    >
      <LoginCard />
    </Grid>
  );
};
export default Login;
