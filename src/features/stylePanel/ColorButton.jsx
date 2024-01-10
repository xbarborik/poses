import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor, selectColor } from "./styleSlice";

const StyledColorButton = styled.button`
  display: block;
  /* flex: 1; */
  aspect-ratio: 1;
  pointer-events: auto;
  margin: 0.1rem;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: none;
  outline: ${(props) =>
    props.$isActive ? `2px solid ${props.$color}` : "0px"};
  outline-offset: 1.5px;

  @media only screen and (max-width: 768px) {
    width: 1.65rem;
    height: 1.65rem;
  }

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
