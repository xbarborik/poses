import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import toolbarReducer from "./features/tools/toolbarSlice";

const store = configureStore({
  reducer: { canvas: canvasReducer, toolbar: toolbarReducer },
});

export default store;
