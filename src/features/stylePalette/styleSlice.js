/**
 * File: styleSlice.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Global management of styling part of states.
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  strokeWidth: 5,
  color: "#F50035",
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
  },
});

export const { setStrokeWidth, selectColor } = styleSlice.actions;
export default styleSlice.reducer;

export const getStrokeWidth = (state) => state.style.strokeWidth;

export const getColor = (state) => state.style.color;
