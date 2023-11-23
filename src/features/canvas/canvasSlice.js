import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  images: [], // {id: null, path: , objects: {}}
  currentImageIndx: 0,
  color: "#FF0000",
  stageSize: { width: 0, height: 0 },
  selectedObject: { id: 0 },
  isDrawing: false,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = true;
    },
    setCurrentImageIndx(state, action) {
      state.currentImageIndx = action.payload;
    },
    setImages(state, action) {
      state.images = action.payload.map((image) => ({ ...image, objects: {} }));
      state.isLoading = false;
    },
    updateWithObject(state, action) {
      state.images[state.currentImageIndx].objects[action.payload.id] =
        action.payload;
    },
    removeObject(state, action) {
      delete state.images[state.currentImageIndx].objects[action.payload];
    },
    clearObjects(state) {
      state.images[state.currentImageIndx].objects = {};
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
  setIsLoading,
  setImages,
  setCurrentImageIndx,
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

export const getIsLoading = (state) => state.canvas.isLoading;

export const getImagesCount = (state) => state.canvas.images.length;

export const getCurrentImage = (state) =>
  state.canvas.images.at(state.canvas.currentImageIndx);

export const getCurrentImageIndx = (state) => state.canvas.currentImageIndx;

export const getObjects = (state) =>
  state.canvas.images[state.canvas.currentImageIndx]?.objects;

export const getColor = (state) => state.canvas.color;

export const getIsDrawing = (state) => state.canvas.isDrawing;

export const getSelectedObject = (state) => state.canvas.selectedObject;

export const isSelectedObject = (state, payload) =>
  state.canvas.selectedObject === payload;
