import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objects: [{ type: "text", x: 100, y: 100, text: "Hello World" }],
  color: "#FF0000",
  stageSize: { width: 0, height: 0 },
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    addObject(state, action) {
      state.objects.push(action.payload);
    },
    removeObject(state, action) {
      state.objects.filter((object) => object.id !== action.payload);
    },
    clearObjects(state) {
      state.objects = [];
    },
    selectColor(state, action) {
      state.color = action.payload;
    },
  },
});

export const {
  addObject,
  removeObject,
  clearObjects,
  setStageSize,
  selectColor,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const getObjects = (state) => state.canvas.objects;

export const getColor = (state) => state.canvas.color;
