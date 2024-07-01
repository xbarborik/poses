/**
 * File: useAdjustColorandWidth.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Listens to changes in styles and modifies object to new styling.
 */

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStrokeWidth, getColor } from "./styleSlice";
import { updateWithObject } from "../canvas/canvasSlice";

function useAdjustColorAndWidth(object, isSelected, stageScale = 1) {
  const dispatch = useDispatch();
  const selectedColor = useSelector(getColor);
  const selectedStrokeWidth = useSelector(getStrokeWidth);

  useEffect(() => {
    if (
      isSelected &&
      ((object.color !== selectedColor && selectedColor !== null) ||
        (object.strokeWidth !== selectedStrokeWidth &&
          selectedStrokeWidth != null))
    ) {
      dispatch(
        updateWithObject({
          ...object,
          color: selectedColor,
          strokeWidth: selectedStrokeWidth / stageScale,
        })
      );
    }
  }, [
    isSelected,
    selectedColor,
    selectedStrokeWidth,
    dispatch,
    object,
    stageScale,
  ]);
}

export default useAdjustColorAndWidth;
