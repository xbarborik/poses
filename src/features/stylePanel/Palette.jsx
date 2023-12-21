import styled from "styled-components";
import ColorButton from "./ColorButton";

import StrokeWidthSlider from "./StrokeWidthSlider";
import { useSelector } from "react-redux";
import {
  getIsDrawing,
  getSelectedObject,
  getSelectedObjectId,
} from "../canvas/canvasSlice";
import { useState } from "react";
import { getColor } from "./styleSlice";
import { INITIAL_STROKE_WIDTH } from "../../utils/constants";

const StyledPalette = styled.div`
  display: flex;
  gap: 0.6rem;

  @media only screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 0.5rem 0.2rem;
  align-items: center;
  justify-content: center;
  boxsizing: border-box;
  pointer-events: ${(props) => (props.$isHighlighted ? "auto" : "none")};

  padding: 0.5rem 2rem;
  //width: 100%;
  border-radius: 20px;
  margin-top: 0.2rem;
  width: auto;
  background: ${(props) =>
    props.$isHighlighted ? "rgba(0,0,0, 0.2)" : "none"};

  // @media only screen and (max-width: 768px) {
  //   flex-direction: column;
  // }
`;

const ToggleButton = styled.button`
  display: block;

  aspect-ratio: 1;

  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

function Palette() {
  const selectedObject = useSelector(getSelectedObject);
  const selectedColor = useSelector(getColor);
  const isDrawing = useSelector(getIsDrawing);
  const isHighlighted =
    selectedObject &&
    selectedObject.id !== null &&
    selectedObject.type !== "comment";
  const [show, setShow] = useState(true);

  if (isDrawing) return null;

  return (
    <>
      <PaletteContainer $isHighlighted={isHighlighted} name="adjust">
        {show && (
          <>
            <StrokeWidthSlider defaultValue={6} minValue={4} maxValue={16} />
            <StyledPalette name="adjust">
              <ColorButton color={"#FF0000"} />
              <ColorButton color={"#000000"} />
              <ColorButton color={"#ffffff"} />
              <ColorButton color={"#1133e0"} />
              <ColorButton color={"#f8f400"} />
              <ColorButton color={"#2fe900"} />
            </StyledPalette>
          </>
        )}
        {/* <ToggleButton
          $color={selectedColor}
          onClick={() => setShow((show) => !show)}
        /> */}
      </PaletteContainer>
    </>
  );
}

export default Palette;
