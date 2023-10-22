import { useDispatch, useSelector } from "react-redux";
import { getColor, selectColor } from "../canvas/canvasSlice";
import styled from "styled-components";

const StyledColorButton = styled.button`
  display: block;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.$isActive ? "3px solid white" : "3px groove #4e4c4c44"};
`;

function ColorButton({ color }) {
  const dispatch = useDispatch();
  const activeColor = useSelector(getColor);

  return (
    <StyledColorButton
      onClick={() => dispatch(selectColor(color))}
      color={color}
      $isActive={color === activeColor}
    />
  );
}

export default ColorButton;
