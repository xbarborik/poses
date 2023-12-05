import styled from "styled-components";
import ColorButton from "./ColorButton";
import { useSelector } from "react-redux";
import { getSelectedTool } from "../tools/toolbarSlice";
import StrokeWidthSlider from "../stroke-width-slider/StrokeWidthSlider";

const StyledPalette = styled.div`
  display: flex;

  gap: 1rem;

  @media only screen and (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-grow: 1;

  align-items: center;
  flex-direction: row-reverse;
  margin-left: auto;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

function Palette() {
  return (
    <PaletteContainer>
      <StyledPalette>
        <ColorButton color={"#FF0000"} />
        <ColorButton color={"#000000"} />
        <ColorButton color={"#ffffff"} />
        <ColorButton color={"#1133e0"} />
        <ColorButton color={"#f8f400"} />
        <ColorButton color={"#2fe900"} />
      </StyledPalette>
      <StrokeWidthSlider defaultValue={8} minValue={4} maxValue={16} />
    </PaletteContainer>
  );
}

export default Palette;
