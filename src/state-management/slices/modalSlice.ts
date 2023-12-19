import { ReactNode } from 'react';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Breakpoint } from '@mui/material';
export interface ModalState {
  open: boolean;
  content: null | ReactNode;
  maxWidth?: false | Breakpoint | undefined;
}
const initialState: ModalState = {
  open: false,
  content: null,
  maxWidth: 'xs',
};

const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setOpenModal: (state, action: PayloadAction<ModalState>) => {
      state.open = action.payload.open;
      state.content = action.payload.content;
      state.maxWidth = action.payload.maxWidth;
    },
    setCloseModal: (state) => {
      state.open = false;
    },
  },
});

export const { setCloseModal, setOpenModal } = modalSlice.actions;

export default modalSlice.reducer;
