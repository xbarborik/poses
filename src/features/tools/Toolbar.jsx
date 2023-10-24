import { FaPencilAlt, FaEraser, FaHandPaper } from "react-icons/fa";
import { GoHorizontalRule } from "react-icons/go";
import { BsCircle, BsArrowUp } from "react-icons/bs";
import ToolButton from "./ToolButton";
import styled from "styled-components";

const StyledToolBar = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.8rem;
`;

function Toolbar() {
  return (
    <StyledToolBar>
      <ToolButton type={"grab"}>
        <FaHandPaper />
      </ToolButton>
      <ToolButton type={"freeHand"}>
        <FaPencilAlt />
      </ToolButton>
      <ToolButton type={"line"}>
        <GoHorizontalRule style={{ transform: "rotate(90deg)" }} />
      </ToolButton>
      <ToolButton type={"arrow"}>
        <BsArrowUp />
      </ToolButton>
      <ToolButton type={"circle"}>
        <BsCircle />
      </ToolButton>
      <ToolButton type={"eraser"}>
        <FaEraser />
      </ToolButton>
    </StyledToolBar>
  );
}

export default Toolbar;
