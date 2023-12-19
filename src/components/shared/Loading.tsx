import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LoadingPage = ({ height = "60vh" }: { height: string }) => {
  return (
    <Box
      role="loading"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height,
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingPage;
