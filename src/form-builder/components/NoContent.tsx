import { FC } from 'react';
import { Box } from '@mui/material';

const NoContent: FC<{ text: string }> = ({ text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        mx: 'auto',
      }}
    >
      {text}
    </Box>
  );
};
export default NoContent;
