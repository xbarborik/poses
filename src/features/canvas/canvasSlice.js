import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objects: {},
  color: "#FF0000",
  stageSize: { width: 0, height: 0 },
  selectedObject: { id: 0 },
  isDrawing: false,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    updateWithObject(state, action) {
      console.log(action.payload.id);
      state.objects[action.payload.id] = action.payload;
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
    selectObject(state, action) {
      state.selectedObject = action.payload;
    },
    deselectObject(state) {
      state.selectedObject = { id: 0 };
    },
    setIsDrawing(state, action) {
      state.isDrawing = action.payload;
    },
  },
});

export const {
  updateWithObject,
  removeObject,
  clearObjects,
  setStageSize,
  selectColor,
  selectObject,
  deselectObject,
  setIsDrawing,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const getObjects = (state) => state.canvas.objects;

export const getColor = (state) => state.canvas.color;

export const getIsDrawing = (state) => state.canvas.isDrawing;

export const getSelectedObject = (state) => state.canvas.selectedObject;

export const isSelectedObject = (state, payload) =>
  state.canvas.selectedObject === payload;
