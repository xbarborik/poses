/**
 * File: toolBarSlice.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Part of store to manage changes in toolbar.
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTool: "freeHand",
};

const toolbarSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    selectTool(state, action) {
      state.selectedTool = action.payload;
    },
  },
});

export const { selectTool } = toolbarSlice.actions;
export default toolbarSlice.reducer;

export const getSelectedTool = (state) => state.toolbar.selectedTool;
