/**
 * File: StylePalette.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Palette for strokeWidth and ColorButtons
 */

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
  padding: 0.3rem 2rem;
  padding-bottom: 5rem;
  border-radius: 20px 20px 0px 0px;
  width: auto;
  background: rgba(41, 41, 41, 0.3);
  position: relative;
  top: 4.5rem;
  transform: ${(props) =>
    props.$isHighlighted ? "translateY(-0.5rem)" : "translateY(0)"};
  transition: transform 0.2s ease;
`;

function StylePalette() {
  const selectedObject = useSelector(getSelectedObject);
  const selectedTool = useSelector(getSelectedTool);
  const isDrawing = useSelector(getIsDrawing);
  const isDragging = useSelector(getIsDragging);
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    setIsHighlighted(
      selectedObject && selectedObject.id !== null && selectedObject.type !== ""
    );
  }, [selectedObject, selectedTool, isDrawing]);

  if (isDrawing || isDragging) return;

  return (
    <>
      <PaletteContainer $isHighlighted={isHighlighted} $isDrawing={isDrawing}>
        <StrokeWidthSlider
          name="adjust"
          defaultValue={5}
          minValue={2}
          maxValue={18}
        />
        <StyledPalette name="adjust">
          <ColorButton color={"#F50035"} />
          <ColorButton color={"#1E88E5"} />
          <ColorButton color={"#FFDF07"} />
          <ColorButton color={"#62e22b"} />
          <ColorButton color={"#000000"} />
          <ColorButton color={"#F8F8F8"} />
        </StyledPalette>
      </PaletteContainer>
    </>
  );
}

export default StylePalette;
