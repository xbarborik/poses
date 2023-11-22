import styled from "styled-components";
import CustomSlider from "../../ui/Slider";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setStrokeWidth } from "./sliderSlice";

const StyledStrokeWidthSlider = styled.div`
  flex-grow: 1;

  max-width: 200px;
`;

function StrokeWidthSlider({ defaultValue, ...props }) {
  const [value, setValue] = useState(defaultValue);
  const dispatch = useDispatch();

  useEffect(() => {
    function initialStrokeWidth() {
      dispatch(setStrokeWidth(defaultValue));
    }

    initialStrokeWidth();
  }, []);

  function onChange(newValue) {
    setValue(newValue);
    dispatch(setStrokeWidth(newValue));
  }

  return (
    <StyledStrokeWidthSlider>
      <CustomSlider onChange={onChange} value={value} {...props} />
    </StyledStrokeWidthSlider>
  );
}

export default StrokeWidthSlider;
