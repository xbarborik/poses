import styled from "styled-components";
import ColorButton from "./ColorButton";
import { useSelector } from "react-redux";
import { getSelectedTool } from "../tools/toolbarSlice";

const StyledPalette = styled.div`
  grid-area: colors;
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
  justify-content: end;
`;

function Palette() {
  const tool = useSelector(getSelectedTool);

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
