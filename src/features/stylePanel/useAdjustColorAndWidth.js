import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStrokeWidth, getColor } from "./styleSlice";
import { updateWithObject } from "../canvas/canvasSlice";

// Works but currently also changes color of any clicked object

function useAdjustColorAndWidth(object, isSelected) {
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
          strokeWidth: selectedStrokeWidth,
        })
      );
    }
  }, [isSelected, selectedColor, selectedStrokeWidth, dispatch, object]);
}

export default useAdjustColorAndWidth;
