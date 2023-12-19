import { PayloadAction, createSlice } from '@reduxjs/toolkit';
interface SnackbarState {
  open: boolean;
  message: string;
  type: 'success' | 'error' | 'warning';
  autoHideDuration?: number;
  anchorOrigin?: {
    horizontal: 'left' | 'center' | 'right';
    vertical: 'top' | 'bottom';
  };
}

const initialState: SnackbarState = {
  type: 'success',
  message: '',
  open: false,
  anchorOrigin: { vertical: 'top', horizontal: 'center' },
  autoHideDuration: 3000,
};

const snackbarSlice = createSlice({
  name: 'snackbarSlice',
  initialState,
  reducers: {
    setOpenSnackbar: (state, action: PayloadAction<SnackbarState>) => {
      state.open = action.payload.open;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.autoHideDuration = action.payload.autoHideDuration || state.autoHideDuration;
      state.anchorOrigin = action.payload.anchorOrigin || state.anchorOrigin;
    },
    setCloseSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { setOpenSnackbar, setCloseSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
