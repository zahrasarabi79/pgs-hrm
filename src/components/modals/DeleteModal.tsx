import React, { FC } from 'react';
import { Button, CircularProgress, Stack } from '@mui/material';
import { useAppDispatch } from '@/state-management/store/store';
import { setCloseModal } from '@/state-management/slices/modalSlice';
import useQueryParams from '@/components/hooks/useQueryParams';

interface DeleteModalProps {
  isLoading: boolean;
  deleteFunction: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({ isLoading, deleteFunction }) => {
  const dispatch = useAppDispatch();
  const updateQueryParams = useQueryParams();
  const handleRemove = async () => {
    await deleteFunction();
    dispatch(setCloseModal());
    updateQueryParams({ page: 1 });
  };
  return (
    <Stack direction="row" spacing={2} sx={{ mt: '16px' }}>
      <Button
        disabled={isLoading}
        fullWidth
        variant="contained"
        color="error"
        onClick={() => dispatch(setCloseModal())}
      >
        لغو
      </Button>
      <Button
        disabled={isLoading}
        endIcon={isLoading && <CircularProgress size={12} color="secondary" />}
        fullWidth
        variant="outlined"
        color="inherit"
        onClick={handleRemove}
      >
        تایید
      </Button>
    </Stack>
  );
};

export default DeleteModal;
