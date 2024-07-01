/**
 * File: store.js
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    combine redux toolkit stores into one store
 */

import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "./features/canvas/canvasSlice";
import toolbarReducer from "./features/toolbar/toolbarSlice";
import styleReducer from "./features/stylePalette/styleSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    toolbar: toolbarReducer,
    style: styleReducer,
  },
});

export default store;
