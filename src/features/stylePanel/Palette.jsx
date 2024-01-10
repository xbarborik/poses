import styled from "styled-components";
import ColorButton from "./ColorButton";

import StrokeWidthSlider from "./StrokeWidthSlider";
import { useSelector } from "react-redux";
import { getIsDrawing, getSelectedObject } from "../canvas/canvasSlice";
import { useEffect, useState } from "react";
import { getColor } from "./styleSlice";
import { getSelectedTool } from "../tools/toolbarSlice";

const StyledPalette = styled.div`
  display: flex;
  gap: 0.5rem;

  @media only screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  boxsizing: border-box;
  pointer-events: ${(props) => (props.$isHighlighted ? "auto" : "auto")};

  padding: 0.3rem 2rem;
  //width: 100%;
  border-radius: 0 0 20px 20px;
  width: auto;
  background: ${(props) =>
    props.$isHighlighted ? "rgba(0,0,0, 0.2)" : "rgba(0,0,0, 0.2)"};
  // visibility: ${(props) => (props.$isDrawing ? "hidden" : "visible")};

  // @media only screen and (max-width: 768px) {
  //   flex-direction: column;
  // }

  position: absolute;
  top: ${(props) => (props.$isHighlighted ? "0" : "-1.2rem")};
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
  const selectedColor = useSelector(getColor);
  const isDrawing = useSelector(getIsDrawing);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setIsHighlighted(
      (selectedTool && selectedTool === "style") ||
        (selectedObject &&
          selectedObject.id !== null &&
          selectedObject.type !== "comment")
    );
  }, [selectedObject, selectedTool, isDrawing]);

  return (
    <>
      <PaletteContainer
        $isHighlighted={isHighlighted}
        $isDrawing={isDrawing}
        name="adjust"
        onClick={() => setIsHighlighted(true)}
      >
        <StrokeWidthSlider defaultValue={6} minValue={4} maxValue={16} />
        <StyledPalette name="adjust">
          <ColorButton color={"#F50035"} />
          <ColorButton color={"#000000"} />
          <ColorButton color={"#F8F8F8"} />
          <ColorButton color={"#1E88E5"} />
          <ColorButton color={"#FFDF07"} />
          <ColorButton color={"#62e22b"} />
        </StyledPalette>

        {/* <ToggleButton
          $color={selectedColor}
          onClick={() => setShow((show) => !show)}
        /> */}
      </PaletteContainer>
    </>
  );
}

export default Palette;
