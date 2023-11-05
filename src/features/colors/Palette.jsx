import styled from "styled-components";
import ColorButton from "./ColorButton";

const StyledPalette = styled.div`
  grid-area: colors;
  display: flex;
  gap: 1rem;
  padding: 0.8rem;
`;

function Palette() {
  return (
    <StyledPalette>
      <ColorButton color={"#FF0000"} />
      <ColorButton color={"#f8f400"} />
      <ColorButton color={"#ff6a00"} />
      <ColorButton color={"#2fe900"} />
      <ColorButton color={"#1133e0"} />
      <ColorButton color={"#ffffff"} />
      <ColorButton color={"#000000"} />
    </StyledPalette>
  );
}

export default Palette;
