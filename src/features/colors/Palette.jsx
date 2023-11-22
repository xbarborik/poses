import styled from "styled-components";
import ColorButton from "./ColorButton";
import { useSelector } from "react-redux";
import { getSelectedTool } from "../tools/toolbarSlice";

const StyledPalette = styled.div`
  grid-area: colors;
  display: flex;
  flex-grow: 1;
  gap: 1rem;
  /* justify-content: space-evenly; */
  justify-content: flex-end;
  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

function Palette() {
  return (
    <StyledPalette>
      <ColorButton color={"#FF0000"} />
      <ColorButton color={"#000000"} />
      <ColorButton color={"#ffffff"} />
      <ColorButton color={"#1133e0"} />
      <ColorButton color={"#f8f400"} />
      <ColorButton color={"#2fe900"} />
    </StyledPalette>
  );
}

export default Palette;
