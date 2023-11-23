import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";
import { getColor } from "../canvas/canvasSlice";

const StyledToolButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
  border: none;
  pointer-events: auto;
  background-color: ${(props) =>
    props.$isActive ? "#fff" : "rgba(255, 255, 255, 0.5)"};
  outline: ${(props) =>
    props.$isActive ? `4px solid ${props.$color}` : "0px"};
  outline-offset: 2px;
  margin-right: 0.5rem;

  &:hover {
    transform: scale(1.1);
    background-color: "#fff";
  }

  @media (max-width: 768px) or (orientation: landscape) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 2rem;
    outline-width: 2px;
  }
`;

function ToolButton({ children, type }) {
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
    <StyledToolButton onClick={handleClick} $isActive={isActive} $color={color}>
      {children}
    </StyledToolButton>
    // </StyledWrapper>
  );
}

export default ToolButton;
