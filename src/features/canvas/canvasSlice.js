/**
 * File: canvasSlice.js
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *  contains part of global state for redux store with logic belonging to canvas
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  image: {
    id: null,
    objects: {},
    pastObjects: [],
    futureObjects: [],
    path: "",
  },

  isOpacityLowered: false,
  stageScale: 1,
  stagePos: { x: 0, y: 0 },
  selectedObjectId: null,
  isDrawing: false,
  isDragging: false,
  isExporting: false,
  viewOnly: false,
  isModified: false,
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

    setViewOnly(state, action) {
      state.viewOnly = action.payload;
    },

    setImage(state, action) {
      state.isModified = false;
      state.image = { ...action.payload, pastObjects: [], futureObjects: [] };
      state.isLoading = false;
    },

    setStageScale(state, action) {
      state.stageScale = action.payload;
    },
    setStagePos(state, action) {
      state.stagePos = action.payload;
    },

    updateWithObject(state, action) {
      state.image.objects[action.payload.id] = action.payload;
      state.image.futureObjects = [];
      state.selectedObjectId = action.payload.id;
      state.isDragging = false;
      state.isModified = true;
    },
    updateHistory(state) {
      const objects = state.image.objects;
      state.image.pastObjects.push(objects);
      if (state.image.pastObjects.length > 40)
        state.image.pastObjects = state.image.pastObjects.slice(1);
    },
    removeObject(state, action) {
      const objects = state.image.objects;
      const object = objects[action.payload];

      if (object?.id === state.selectedObjectId) state.selectedObjectId = null;

      const pastObjects = { ...objects };

      state.image.pastObjects.push(pastObjects);
      delete objects[action.payload];
      state.image.futureObjects = [];
      state.isModified = true;
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
    setIsExporting(state, action) {
      state.isExporting = action.payload;
    },
    setFocus(state, action) {
      state.image.focusPoint = action.payload;
    },
    setIsModified(state, action) {
      state.isModified = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setViewOnly,
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
  setIsExporting,
  setIsDragging,
  setFocus,
  setIsModified,
} = canvasSlice.actions;
export default canvasSlice.reducer;

export const getIsLoading = (state) => state.canvas.isLoading;

export const getViewOnly = (state) => state.canvas.viewOnly;

export const getOpacityLowered = (state) => state.canvas.isOpacityLowered;

export const getIsImageSet = (state) => state.canvas.image.id !== null;

export const getCurrentImage = (state) => state.canvas.image;

export const getObjects = (state) => state.canvas.image?.objects;

export const getFocus = (state) => state.canvas.image?.focusPoint;

export const getIsDrawing = (state) => state.canvas.isDrawing;

export const getIsDragging = (state) => state.canvas.isDragging;

export const getIsExporting = (state) => state.canvas.isExporting;

export const getStageScale = (state) => state.canvas.stageScale;

export const getStagePos = (state) => state.canvas.stagePos;

export const getSelectedObjectId = (state) => state.canvas.selectedObjectId;

export const getIsModified = (state) => state.canvas.isModified;

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
