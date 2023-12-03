import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  color: "#FF0000",
};

const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {
    selectColor(state, action) {
      state.color = action.payload;
    },
  },
});

export const { selectColor } = colorSlice.actions;
export default colorSlice.reducer;

export const getColor = (state) => state.color.color;
