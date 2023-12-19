import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IPopoverState {
  popoverEl: HTMLButtonElement | null;
}

const initialState: IPopoverState = {
  popoverEl: null,
};

const popoverSlice = createSlice({
  name: 'popover',
  initialState,
  reducers: {
    setOpenPopover: (state, action: PayloadAction<IPopoverState>) => {
      // @ts-ignore
      state.popoverEl = action.payload.popoverEl;
    },
    setClosePopover: (state) => {
      state.popoverEl = null;
    },
  },
});

export const { setOpenPopover, setClosePopover } = popoverSlice.actions;
export default popoverSlice.reducer;
