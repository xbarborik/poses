import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";

const StyledToolButton = styled.button`
  :hover {
    border-color: #f9f9f9;
  }
`;

function ToolButton({ children, type }) {
  const dispatch = useDispatch();
  const selectedTool = useSelector(getSelectedTool);
  const isActive = selectedTool === type;

  return (
    <StyledToolButton
      onClick={() => dispatch(selectTool(type))}
      disabled={isActive}
    >
      {children}
    </StyledToolButton>
  );
}

export default ToolButton;
