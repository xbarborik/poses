/**
 * File: StrokeWidthSlider.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Slider for setting width
 */

import styled from "styled-components";
import CustomSlider from "../../ui/Slider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStrokeWidth, setStrokeWidth } from "./styleSlice";
import { getColor } from "./styleSlice";

const StyledStrokeWidthSlider = styled.div`
  pointer-events: auto;
  max-width: 300px;
  min-width: 120px;
  padding: 0 1rem;
`;

function StrokeWidthSlider({ defaultValue, ...props }) {
  const [value, setValue] = useState(defaultValue);
  const color = useSelector(getColor);
  const dispatch = useDispatch();
  const changedWidth = useSelector(getStrokeWidth);

  useEffect(() => {
    function updateWidth() {
      if (changedWidth > 0) {
        setValue(changedWidth);
        dispatch(setStrokeWidth(changedWidth));
      }
    }

    updateWidth();
  }, [dispatch, changedWidth]);

  function onChange(newValue) {
    setValue(newValue);
    dispatch(setStrokeWidth(newValue));
  }

  return (
    <StyledStrokeWidthSlider>
      <CustomSlider
        name="adjust-width"
        onChange={onChange}
        value={value}
        color={color}
        {...props}
      />
    </StyledStrokeWidthSlider>
  );
}

export default StrokeWidthSlider;
