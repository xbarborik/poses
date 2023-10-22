import { FaPaintBrush, FaEraser } from "react-icons/fa";
import { HiOutlineMinus } from "react-icons/hi";
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
      <ToolButton type={"brush"}>
        <FaPaintBrush />
      </ToolButton>
      <ToolButton type={"line"}>
        <HiOutlineMinus />
      </ToolButton>
      <ToolButton type={"arrow"}>
        <BsArrowUp />
      </ToolButton>
      <ToolButton type={"Circle"}>
        <BsCircle />
      </ToolButton>
      <ToolButton type={"eraser"}>
        <FaEraser />
      </ToolButton>
    </StyledToolBar>
  );
}

export default Toolbar;
