import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTool, selectTool } from "./toolbarSlice";

const StyledToolButton = styled.button`
  font-size: 1.5rem;

  border-radius: 50%;
  width: 4rem;
  height: 4rem;

  background-color: ${(props) => (props.$isActive ? "#fff" : "#bbbbbb")};

  border: ${(props) =>
    props.$isActive ? "4px solid #02a6ff" : "1px solid #fff"};

  :hover {
    color: #00aaff;
  }
`;

function ToolButton({ children, type }) {
  const dispatch = useDispatch();
  const selectedToolType = useSelector(getSelectedTool);
  const isActive = selectedToolType === type;

  return (
    <StyledToolButton
      onClick={() => dispatch(selectTool(type))}
      $isActive={isActive}
    >
      {children}
    </StyledToolButton>
  );
}

export default ToolButton;
