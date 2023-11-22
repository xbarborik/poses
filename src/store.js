import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import toolbarReducer from "./features/tools/toolbarSlice";
import sliderSlice from "./features/stroke-width-slider/sliderSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    toolbar: toolbarReducer,
    slider: sliderSlice,
  },
});

export default store;
