/**
 * File: ColorButton.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Button component for setting color in canvas
 */

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getColor, selectColor } from "./styleSlice";

const StyledColorButton = styled.button`
  display: block;
  aspect-ratio: 1;
  pointer-events: auto;
  margin: 0.1rem;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  border: none;
  width: 1.6rem;
  height: 1.6rem;
  outline: ${(props) =>
    props.$isActive ? `3px solid ${props.$color}` : "0px"};
  outline-offset: 2px;
  cursor: pointer;
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
