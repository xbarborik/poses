import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor, selectColor } from "./styleSlice";

const StyledColorButton = styled.button`
  display: block;
  /* flex: 1; */
  aspect-ratio: 1;
  pointer-events: auto;
  margin: 0.1rem;

  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: none;

  width: ${(props) => (props.$isActive ? `1.7rem` : "1.5rem")};
  height: ${(props) => (props.$isActive ? `1.7rem` : "1.5rem")};

  &:hover {
    cursor: pointer;
  }
`;

function ColorButton({ color }) {
  const dispatch = useDispatch();
  const activeColor = useSelector(getColor);

  return (
    <StyledColorButton
      name="adjust-color"
      onClick={() => dispatch(selectColor(color))}
      $color={color}
      $isActive={color === activeColor}
    />
  );
}

export default ColorButton;
