'use client';
import { Box, Button } from '@mui/material';
import { Panel } from 'reactflow';
import { useRouter } from 'next/navigation';

const FormButtonsPanel = () => {
  const router = useRouter();
  return (
    <Panel position="bottom-left">
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button variant="contained" color="success" type="submit" sx={{ borderRadius: '8px' }}>
          ثبت
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ borderRadius: '8px' }}
          onClick={() => router.back()}
        >
          برگشتن
        </Button>
      </Box>
    </Panel>
  );
};

export default FormButtonsPanel;
