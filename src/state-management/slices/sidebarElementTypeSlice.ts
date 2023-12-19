import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISidebarElementTypeState {
  sidebarElementType: string;
}

const initialState: ISidebarElementTypeState = {
  sidebarElementType: '',
};

const sidebarElementTypeSlice = createSlice({
  name: 'sidebarElementType',
  initialState,
  reducers: {
    setSidebarElementType: (
      state,
      action: PayloadAction<ISidebarElementTypeState['sidebarElementType']>,
    ) => {
      state.sidebarElementType = action.payload;
    },
  },
});

export const { setSidebarElementType } = sidebarElementTypeSlice.actions;
export default sidebarElementTypeSlice.reducer;
