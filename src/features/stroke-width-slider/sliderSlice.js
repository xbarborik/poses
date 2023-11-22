import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  strokeWidth: 0,
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    setStrokeWidth(state, action) {
      state.strokeWidth = action.payload;
    },
  },
});

export const { setStrokeWidth } = sliderSlice.actions;
export default sliderSlice.reducer;

export const getStrokeWidth = (state) => state.slider.strokeWidth;
