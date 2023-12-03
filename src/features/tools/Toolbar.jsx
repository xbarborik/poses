import { TbScribble } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import { BsCircle, BsArrowUp } from "react-icons/bs";
import ToolButton from "./ToolButton";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getIsDrawing } from "../canvas/canvasSlice";

const StyledToolBar = styled.div`
  grid-area: tools;
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 2rem;
  pointer-events: none;

  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`;

function Toolbar() {
  const isDrawing = useSelector(getIsDrawing);

  return (
    !isDrawing && (
      <StyledToolBar>
        <ToolButton type={"freeHand"}>
          <TbScribble />
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
        {/* <ToolButton type={"angle"}>Angle</ToolButton> */}
        {/* <ToolButton type={"eraser"}>
          <FaEraser />
        </ToolButton> */}
      </StyledToolBar>
    )
  );
}

export default Toolbar;
