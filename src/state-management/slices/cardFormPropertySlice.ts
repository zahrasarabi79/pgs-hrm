import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CardFormVariant = 'outlined' | 'elevation';

export interface ICardFormPropertiesState {
  borderRadius?: number;
  variant?: CardFormVariant;
  elevation?: number;
  isHeader?: boolean;
  titleHeader?: string;
  subTitleHeader?: string;
  primaryButtonTitle?: string;
  primaryButtonAlignment?: 'right' | 'center' | 'left';
  isCancelButton?: boolean;
  cancelButtonTitle?: string;
}

const initialState: ICardFormPropertiesState = {
  borderRadius: 0,
  variant: 'elevation',
  elevation: 2,
  isHeader: false,
  titleHeader: 'نمونه سربرگ',
  subTitleHeader: 'نمونه زیر سربرگ',
  primaryButtonTitle: 'ثبت',
  primaryButtonAlignment: 'right',
  isCancelButton: false,
  cancelButtonTitle: 'انصراف',
};

const cardFormPropertiesSlice = createSlice({
  name: 'cardFormProperties',
  initialState,
  reducers: {
    setBorderRadius: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.borderRadius = action.payload.borderRadius;
    },
    setVariant: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.variant = action.payload.variant;
    },
    setElevation: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.elevation = action.payload.elevation;
    },
    setIsHeader: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.isHeader = action.payload.isHeader;
    },
    setHeaderTitle: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.titleHeader = action.payload.titleHeader;
    },
    setHeaderSubTitle: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.subTitleHeader = action.payload.subTitleHeader;
    },
    setPrimaryButtonTitle: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.primaryButtonTitle = action.payload.primaryButtonTitle;
    },
    setPrimaryButtonAlignment: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.primaryButtonAlignment = action.payload.primaryButtonAlignment;
    },
    setIsCancel: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.isCancelButton = action.payload.isCancelButton;
    },
    setCancelButtonTitle: (state, action: PayloadAction<ICardFormPropertiesState>) => {
      state.cancelButtonTitle = action.payload.cancelButtonTitle;
    },
  },
});

export const {
  setBorderRadius,
  setVariant,
  setElevation,
  setHeaderSubTitle,
  setIsHeader,
  setHeaderTitle,
  setPrimaryButtonTitle,
  setPrimaryButtonAlignment,
  setIsCancel,
  setCancelButtonTitle,
} = cardFormPropertiesSlice.actions;
export default cardFormPropertiesSlice.reducer;
