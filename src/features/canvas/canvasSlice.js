import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  images: [], // {id: null, path: [] , past: objects: {}, future: [], size:}
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
    setCurrentImageIndx(state, action) {
      state.currentImageIndx = action.payload;
    },
    setImages(state, action) {
      state.images = action.payload.map((image) => ({
        ...image,
        pastObjects: [],
        futureObjects: [],
        size: { width: 0, height: 0 },
      }));
      state.isLoading = false;
    },

    setStageScale(state, action) {
      state.stageScale = action.payload;
    },
    setStagePos(state, action) {
      state.stagePos = action.payload;
    },
    updateWithObject(state, action) {
      state.images[state.currentImageIndx].objects[action.payload.id] =
        action.payload;
      state.images[state.currentImageIndx].futureObjects = [];
    },
    updateHistory(state) {
      const objects = state.images[state.currentImageIndx].objects;
      state.images[state.currentImageIndx].pastObjects.push(objects);
    },
    removeObject(state, action) {
      const objects = state.images[state.currentImageIndx].objects;
      const object = objects[action.payload];

      if (object?.id === state.selectedObjectId) state.selectedObjectId = null;

      const pastObjects = { ...objects };

      state.images[state.currentImageIndx].pastObjects.push(pastObjects);
      delete objects[action.payload];
      state.images[state.currentImageIndx].futureObjects = [];
    },
    removeInvalidObject(state, action) {
      delete state.images[state.currentImageIndx].objects[action.payload];
      state.images[state.currentImageIndx].pastObjects.pop();
    },
    undo(state) {
      const previous = state.images[state.currentImageIndx].pastObjects.pop();
      if (previous) {
        const objects = state.images[state.currentImageIndx].objects;
        state.images[state.currentImageIndx].futureObjects.push(objects);
        state.images[state.currentImageIndx].objects = previous;
      }
    },
    redo(state) {
      const next = state.images[state.currentImageIndx].futureObjects.pop();
      if (next) {
        const objects = state.images[state.currentImageIndx].objects;
        state.images[state.currentImageIndx].pastObjects.push(objects);

        state.images[state.currentImageIndx].objects = next;
      }
    },
    clearObjects(state) {
      state.images[state.currentImageIndx].objects = {};
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
  setImages,
  setCurrentImageIndx,
  toggleOpacityLowered,
  setStageScale,
  setStagePos,
  updateWithObject,
  updateHistory,
  removeObject,
  removeInvalidObject,
  undo,
  redo,
  clearObjects,
  setStageSize,
  selectObject,
  deselectObject,
  setIsDrawing,
  setIsDragging,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const getIsLoading = (state) => state.canvas.isLoading;

export const getOpacityLowered = (state) => state.canvas.isOpacityLowered;

export const getImagesCount = (state) => state.canvas.images.length;

export const getCurrentImage = (state) =>
  state.canvas.images.at(state.canvas.currentImageIndx);

export const getCurrentImageIndx = (state) => state.canvas.currentImageIndx;

export const getObjects = (state) =>
  state.canvas.images[state.canvas.currentImageIndx]?.objects;

export const getIsDrawing = (state) => state.canvas.isDrawing;

export const getIsDragging = (state) => state.canvas.isDragging;

export const getStageScale = (state) => state.canvas.stageScale;

export const getStagePos = (state) => state.canvas.stagePos;

export const getSelectedObjectId = (state) => state.canvas.selectedObjectId;

export const getSelectedObject = (state) =>
  state.canvas.images[state.canvas.currentImageIndx]?.objects[
    state.canvas.selectedObjectId
  ];

export const isSelectedObject = (state, payload) =>
  state.canvas.selectedObject === payload;

export const isPastEmpty = (state) => {
  const pastObjects =
    state.canvas.images[state.canvas.currentImageIndx]?.pastObjects;
  return !pastObjects || pastObjects.length === 0;
};

export const isFutureEmpty = (state) => {
  const futureObjects =
    state.canvas.images[state.canvas.currentImageIndx]?.futureObjects;
  return !futureObjects || futureObjects.length === 0;
};
