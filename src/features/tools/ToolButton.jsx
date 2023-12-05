import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";
import { getColor } from "../colors/colorSlice";

const StyledToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
  border: none;
  pointer-events: auto;
  background-color: ${(props) =>
    props.$isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  outline: ${(props) =>
    props.$isActive ? `4px solid ${props.$color}` : "0px"};
  outline-offset: 2px;
  margin-right: 0.5rem;
  pointer-events: ${(props) => (props.$preventEvents ? "none" : "auto")};

  &:hover {
    transform: scale(1.05);
    background-color: "#fff";
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 2rem;
    outline-width: 2px;
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
      dispatch(selectTool("none"));
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
