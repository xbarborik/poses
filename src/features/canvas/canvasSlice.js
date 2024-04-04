import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  image: { id: null, objects: {} }, // {id: null, path: [] , past: objects: {}, future: [], size:}
  currentImageIndx: 0,
  isOpacityLowered: false,

  stageScale: 1,
  stagePos: { x: 0, y: 0 },
  selectedObjectId: null,
  isDrawing: false,
  isDragging: false,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    toggleOpacityLowered(state) {
      state.isOpacityLowered = !state.isOpacityLowered;
    },
    setIsLoading(state) {
      state.isLoading = true;
    },

    setImage(state, action) {
      state.image = { ...action.payload, pastObjects: [], futureObjects: [] };
      state.isLoading = false;
    },

    setStageScale(state, action) {
      state.stageScale = action.payload;
    },
    setStagePos(state, action) {
      state.stagePos = action.payload;
    },
    setOrignalSize(state, action) {
      state.image.originalSize = action.payload;
    },
    updateWithObject(state, action) {
      state.image.objects[action.payload.id] = action.payload;
      state.image.futureObjects = [];
    },
    updateHistory(state) {
      const objects = state.image.objects;
      state.image.pastObjects.push(objects);
    },
    removeObject(state, action) {
      const objects = state.image.objects;
      const object = objects[action.payload];

      if (object?.id === state.selectedObjectId) state.selectedObjectId = null;

      const pastObjects = { ...objects };

      state.image.pastObjects.push(pastObjects);
      delete objects[action.payload];
      state.image.futureObjects = [];
    },
    removeInvalidObject(state, action) {
      delete state.image.objects[action.payload];
      state.image.pastObjects.pop();
    },
    undo(state) {
      const previous = state.image.pastObjects.pop();
      if (previous) {
        const objects = state.image.objects;
        state.image.futureObjects.push(objects);
        state.image.objects = previous;
      }
    },
    redo(state) {
      const next = state.image.futureObjects.pop();
      if (next) {
        const objects = state.image.objects;
        state.image.pastObjects.push(objects);

        state.image.objects = next;
      }
    },
    clearObjects(state) {
      state.image.objects = {};
    },
    selectObject(state, action) {
      state.selectedObjectId = action.payload;
    },
    deselectObject(state) {
      state.selectedObjectId = null;
    },
    setIsDrawing(state, action) {
      state.isDrawing = action.payload;
    },
    setIsDragging(state, action) {
      state.isDragging = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setImage,
  toggleOpacityLowered,
  setStageScale,
  setStagePos,
  setOrignalSize,
  updateWithObject,
  updateHistory,
  removeObject,
  removeInvalidObject,
  undo,
  redo,
  clearObjects,
  selectObject,
  deselectObject,
  setIsDrawing,
  setIsDragging,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const getIsLoading = (state) => state.canvas.isLoading;

export const getOpacityLowered = (state) => state.canvas.isOpacityLowered;

export const getIsImageSet = (state) => state.canvas.image.id !== null;

export const getCurrentImage = (state) => state.canvas.image;

export const getObjects = (state) => state.canvas.image?.objects;

export const getIsDrawing = (state) => state.canvas.isDrawing;

export const getIsDragging = (state) => state.canvas.isDragging;

export const getStageScale = (state) => state.canvas.stageScale;

export const getStagePos = (state) => state.canvas.stagePos;

export const getOriginalSize = (state) => state.canvas.image?.originalSize;

export const getSelectedObjectId = (state) => state.canvas.selectedObjectId;

export const getSelectedObject = (state) =>
  state.canvas.image.objects[state.canvas.selectedObjectId];

export const isSelectedObject = (state, payload) =>
  state.canvas.selectedObject === payload;

export const isPastEmpty = (state) => {
  const pastObjects = state.canvas.image?.pastObjects;
  return !pastObjects || pastObjects.length === 0;
};

export const isFutureEmpty = (state) => {
  const futureObjects = state.canvas.image?.futureObjects;
  return !futureObjects || futureObjects.length === 0;
};
