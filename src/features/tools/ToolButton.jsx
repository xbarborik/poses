import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";
import { getColor } from "../stylePanel/styleSlice";

const StyledToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  border: none;
  pointer-events: auto;
  background-color: ${(props) =>
    props.$isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  outline: ${(props) =>
    props.$isActive ? `3px solid ${props.$color}` : "0px"};
  outline-offset: 2px;
  margin-right: 0.5rem;
  pointer-events: ${(props) => (props.$preventEvents ? "none" : "auto")};
  color: #393d47;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;

  &:hover {
    transform: scale(1.05);
    background-color: "#fff";
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    width: 2.6rem;
    height: 2.6rem;
    font-size: 2rem;
    outline-width: 3px;
  }

  /* @media only screen and (orientation: landscape) {
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
    outline-width: 2px;
  } */
`;

function ToolButton({ children, type, preventEvents }) {
  const dispatch = useDispatch();
  const selectedToolType = useSelector(getSelectedTool);
  const color = useSelector(getColor);
  const isActive = selectedToolType === type;

  function handleClick() {
    if (isActive) {
      dispatch(selectTool(type));
    } else {
      dispatch(selectTool(type));
    }
  }

  return (
    // <StyledWrapper>
    <StyledToolButton
      onClick={handleClick}
      $isActive={isActive}
      $color={color}
      $preventEvents={preventEvents}
    >
      {children}
    </StyledToolButton>
    // </StyledWrapper>
  );
}

export default ToolButton;
