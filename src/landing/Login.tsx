import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const Login = () => {
  const theme = useTheme();
  const isDownSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
      <Box sx={{ bgcolor: "white", width: "262px", height: "202px", m: "20px", borderRadius: "12px" }}></Box>
    </Grid>
  );
};

export default Login;
