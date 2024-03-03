import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  strokeWidth: 0,
  color: "#FF0000",
  showStyling: false,
};

const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: {
    selectColor(state, action) {
      state.color = action.payload;
    },
    setStrokeWidth(state, action) {
      state.strokeWidth = action.payload;
    },
    setShowStyling(state, action) {
      state.showStyling = action.payload;
    },
  },
});

export const { setStrokeWidth, selectColor, setShowStyling } =
  styleSlice.actions;
export default styleSlice.reducer;

export const getStrokeWidth = (state) => state.style.strokeWidth;

export const getColor = (state) => state.style.color;

export const getShowStyling = (state) => state.style.showStyling;
