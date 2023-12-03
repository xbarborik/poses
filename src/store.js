import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import toolbarReducer from "./features/tools/toolbarSlice";
import sliderReducer from "./features/stroke-width-slider/sliderSlice";
import colorReducer from "./features/colors/colorSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    toolbar: toolbarReducer,
    slider: sliderReducer,
    color: colorReducer,
  },
});

export default store;
