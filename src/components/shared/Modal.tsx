'use client';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useAppDispatch, useAppSelector } from '@/state-management/store/store';
import { setCloseModal } from '@/state-management/slices/modalSlice';

const Modal = () => {
  const { open, content, maxWidth } = useAppSelector((state) => state?.modalSlice);
  const dispatch = useAppDispatch();

  return (
    <>
      <div role="dialog">
        <Dialog
          sx={{ overflow: 'hidden', '& .MuiDialog-paper': { borderRadius: '16px' } }}
          fullWidth
          open={open}
          maxWidth={maxWidth}
          onClose={() => dispatch(setCloseModal())}
        >
          {content}
        </Dialog>
      </div>
    </>
  );
};

export default Modal;
