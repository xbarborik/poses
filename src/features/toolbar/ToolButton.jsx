/**
 * File: ToolButton.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Button component for Toolbar. Sets current tool for canvas.
 */

import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";
import { getColor } from "../stylePalette/styleSlice";
import { getIsImageSet } from "../canvas/canvasSlice";
import { themes } from "../../utils/themes";

const StyledToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 50%;
  width: 2.1rem;
  height: 2.1rem;
  border: none;
  pointer-events: auto;
  opacity: ${(props) => (props.$isActive ? "1" : "0.75")};
  background-color: ${themes.controls};
  outline: ${(props) =>
    props.$isActive ? `3px solid ${props.$color}` : "0px"};
  outline-offset: 2px;
  pointer-events: ${(props) => (props.$preventEvents ? "none" : "auto")};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;

  &:hover {
    transform: scale(1.05);
    background-color: "#fff";
    cursor: pointer;
  }
`;

function ToolButton({ children, type, preventEvents }) {
  const dispatch = useDispatch();
  const selectedToolType = useSelector(getSelectedTool);
  const disabled = useSelector(getIsImageSet) === false;
  const color = useSelector(getColor);
  const isActive = selectedToolType === type;

  function handleClick() {
    dispatch(selectTool(type));
  }

  return (
    // <StyledWrapper>
    <StyledToolButton
      onClick={handleClick}
      $isActive={isActive}
      $color={color}
      $preventEvents={preventEvents}
      disabled={disabled}
    >
      {children}
    </StyledToolButton>
    // </StyledWrapper>
  );
}

export default ToolButton;
