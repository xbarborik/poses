import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import toolbarReducer from "./features/toolbar/toolbarSlice";
import styleReducer from "./features/stylePanel/styleSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    toolbar: toolbarReducer,
    style: styleReducer,
  },
});

export default store;
