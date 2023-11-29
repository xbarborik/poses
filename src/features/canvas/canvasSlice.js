import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  images: [], // {id: null, path: , objects: {}}
  currentImage: {},
  currentImageIndx: 0,
  color: "#FF0000",
  stageSize: { width: 0, height: 0 },
  selectedObjectId: null,
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
      state.images = action.payload.map((image) => ({
        ...image,
        pastObjects: [],
        objects: {},
        futureObjects: [],
      }));
      state.isLoading = false;
    },
    updateWithObject(state, action) {
      // state.images[state.currentImageIndx].futureObjects = [];

      state.images[state.currentImageIndx].objects[action.payload.id] =
        action.payload;
    },
    updateHistory(state) {
      const objects = state.images[state.currentImageIndx].objects;
      state.images[state.currentImageIndx].pastObjects.push(objects);
    },
    removeObject(state, action) {
      const objects = { ...state.images[state.currentImageIndx].objects };
      state.images[state.currentImageIndx].pastObjects.push(objects);
      delete state.images[state.currentImageIndx].objects[action.payload];
      state.images[state.currentImageIndx].futureObjects = [];
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
    selectColor(state, action) {
      state.color = action.payload;
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
  },
});

export const {
  setIsLoading,
  setImages,
  setCurrentImageIndx,
  updateWithObject,
  updateHistory,
  removeObject,
  undo,
  redo,
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

export const getSelectedObjectId = (state) => state.canvas.selectedObjectId;

export const isSelectedObject = (state, payload) =>
  state.canvas.selectedObject === payload;

function getLastKey(obj) {
  const keys = Object.keys(obj);
  return keys.length > 0 ? keys[keys.length - 1] : undefined;
}

function getFirstKey(obj) {
  const keys = Object.keys(obj);
  return keys.length > 0 ? keys[0] : undefined;
}
