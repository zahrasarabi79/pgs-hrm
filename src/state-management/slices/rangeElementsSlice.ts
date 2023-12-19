import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IRangeElementState {
  rangeElement: IRangeElement;
}

export interface IRangeElement {
  selectedRangeItem: 'calender' | 'from' | 'to';
}

const initialState: IRangeElementState = {
  rangeElement: {
    selectedRangeItem: 'from',
  },
};

const rangeElementSlice = createSlice({
  name: 'rangeElement',
  initialState,
  reducers: {
    // this reducer is responsible to select the one of three range-inputs
    setSelectRangeItem: (state, action: PayloadAction<IRangeElement>) => {
      state.rangeElement.selectedRangeItem = action.payload.selectedRangeItem;
    },
  },
});

export const { setSelectRangeItem } = rangeElementSlice.actions;
export default rangeElementSlice.reducer;
