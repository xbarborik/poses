import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStrokeWidth } from "../stroke-width-slider/sliderSlice";
import { updateWithObject } from "../canvas/canvasSlice";
import { getColor } from "../colors/colorSlice";

// Works but currently also changes color of any clicked object

function useAdjustColorAndWidth(line, isSelected) {
  const dispatch = useDispatch();
  const selectedColor = useSelector(getColor);
  const selectedStrokeWidth = useSelector(getStrokeWidth);

  useEffect(() => {
    if (
      isSelected &&
      ((line.color !== selectedColor && selectedColor !== null) ||
        (line.strokeWidth !== selectedStrokeWidth &&
          selectedStrokeWidth != null))
    ) {
      dispatch(
        updateWithObject({
          ...line,
          color: selectedColor,
          strokeWidth: selectedStrokeWidth,
        })
      );
    }
  }, [isSelected, selectedColor, selectedStrokeWidth, dispatch, line]);
}

export default useAdjustColorAndWidth;
