import styled from "styled-components";
import CustomSlider from "../../ui/Slider";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStrokeWidth } from "./sliderSlice";
import { getColor } from "../colors/colorSlice";

const StyledStrokeWidthSlider = styled.div`
  flex-grow: 2;
  max-width: 250px;
  min-width: 150px;
  padding: 0 1rem;
  margin-left: auto;
`;

function StrokeWidthSlider({ defaultValue, ...props }) {
  const [value, setValue] = useState(defaultValue);
  const color = useSelector(getColor);
  const dispatch = useDispatch();

  useEffect(() => {
    function initialStrokeWidth() {
      dispatch(setStrokeWidth(defaultValue));
    }

    initialStrokeWidth();
  }, [dispatch, defaultValue]);

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
