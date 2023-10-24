import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";

const StyledToolButton = styled.button`
  font-size: 1.5rem;
  border: "3px groove #4e4c4c44";
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
