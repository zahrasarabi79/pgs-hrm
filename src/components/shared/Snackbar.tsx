'use client';
import { Snackbar } from '@mui/material';
import { styled } from '@mui/system';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setCloseSnackbar } from '@/state-management/slices/snackbar';

const StyledSnackbar = styled(Snackbar)<{ type: 'success' | 'error' | 'warning' }>(
  ({ theme, type }) => ({
    '& .MuiSnackbarContent-root': {
      backgroundColor:
        type === 'error'
          ? theme.palette.error.main
          : type === 'success'
            ? theme.palette.success.main
            : type === 'warning'
              ? theme.palette.warning.main
              : undefined,
      color: '#ffffff',
      width: 'auto',
      fontWeight: 'bold',
      justifyContent: 'center',
      minWidth: 0,
    },
    borderRadius: '24px',
  }),
);

const SnackbarComponent = () => {
  const dispatch = useAppDispatch();
  const snackbarSlice = useAppSelector((state) => state.snackbarSlice);

  return (
    <StyledSnackbar
      type={snackbarSlice.type}
      message={snackbarSlice.message}
      autoHideDuration={snackbarSlice.autoHideDuration}
      anchorOrigin={snackbarSlice.anchorOrigin}
      open={snackbarSlice.open}
      onClose={() => dispatch(setCloseSnackbar())}
    />
  );
};

export default SnackbarComponent;
