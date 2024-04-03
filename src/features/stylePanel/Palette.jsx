import styled from "styled-components";
import ColorButton from "./ColorButton";

import StrokeWidthSlider from "./StrokeWidthSlider";
import { useSelector } from "react-redux";
import {
  getIsDragging,
  getIsDrawing,
  getSelectedObject,
} from "../canvas/canvasSlice";
import { useEffect, useState } from "react";
import { getColor, getShowStyling } from "./styleSlice";
import { getSelectedTool } from "../toolbar/toolbarSlice";

const StyledPalette = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  @media only screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  boxsizing: border-box;
  pointer-events: ${(props) => (props.$isHighlighted ? "auto" : "auto")};

  padding: 0.3rem 2rem;
  //width: 100%;
  // border-radius: 0 0 20px 20px;
  border-radius: 20px 20px 0px 0px;
  width: auto;
  background: ${(props) =>
    props.$isHighlighted ? "rgba(41, 41, 41, 0.3)" : "rgba(0,0,0, 0.3)"};
  // visibility: ${(props) => (props.$isDrawing ? "hidden" : "visible")};

  // @media only screen and (max-width: 768px) {
  //   flex-direction: column;
  // }

  position: relative;
  top: ${(props) => (props.$isHighlighted ? "0" : "2.2rem")};
  transition: top 0.2s ease;
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
  const selectedTool = useSelector(getSelectedTool);
  const isDrawing = useSelector(getIsDrawing);
  const isDragging = useSelector(getIsDragging);
  const showStyling = useSelector(getShowStyling);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setIsHighlighted(
      showStyling ||
        (selectedTool && selectedTool === "style") ||
        (selectedObject &&
          selectedObject.id !== null &&
          selectedObject.type !== "")
    );
  }, [selectedObject, selectedTool, isDrawing, showStyling]);

  if (isDrawing || isDragging) return;

  return (
    <>
      <PaletteContainer
        $isHighlighted={isHighlighted}
        $isDrawing={isDrawing}
        name="adjust"
        onClick={() => setIsHighlighted(true)}
      >
        <StrokeWidthSlider defaultValue={5} minValue={4} maxValue={16} />
        <StyledPalette name="adjust">
          <ColorButton color={"#F50035"} />
          <ColorButton color={"#000000"} />
          <ColorButton color={"#F8F8F8"} />
          <ColorButton color={"#1E88E5"} />
          <ColorButton color={"#FFDF07"} />
          <ColorButton color={"#62e22b"} />
        </StyledPalette>
      </PaletteContainer>
    </>
  );
}

export default Palette;
