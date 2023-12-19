import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IValue = 'daily' | 'hourly';

export interface IConditionalValueState {
  value: IValue;
}

const initialState: IConditionalValueState = {
  value: 'daily',
};

const conditionalValueSlice = createSlice({
  name: 'conditionalValue',
  initialState,
  reducers: {
    setConditionalValue: (state, action: PayloadAction<IConditionalValueState>) => {
      state.value = action.payload.value;
    },
  },
});

export const { setConditionalValue } = conditionalValueSlice.actions;
export default conditionalValueSlice.reducer;
