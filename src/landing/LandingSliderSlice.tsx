import { createSlice } from "@reduxjs/toolkit";
const initialState = { thumbsSwiper: null, activeIndex: null };
export const LandingSliderSlice = createSlice({
  name: "landingSliderSlice",
  initialState,
  reducers: {},
});
export const {  } = LandingSliderSlice.actions;
export default LandingSliderSlice.reducer;
