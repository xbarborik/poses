import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTool: "brush",
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
