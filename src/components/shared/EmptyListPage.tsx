import { FC } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const EmptyListPage: FC<{ listName: string; route: string }> = ({ listName, route }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '50vh',
        color: 'gray',
      }}
    >
      <Typography variant="h6">هنوز لیستی برای {listName} وجود ندارد</Typography>
      <Button variant="contained" onClick={() => router.push(`${route}`)}>
        ایجاد
      </Button>
    </Box>
  );
};
export default EmptyListPage;
