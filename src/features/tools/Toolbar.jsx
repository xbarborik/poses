import { TbScribble } from "react-icons/tb";
import { GoHorizontalRule } from "react-icons/go";
import { BsCircle, BsArrowUp } from "react-icons/bs";
import ToolButton from "./ToolButton";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getIsDrawing } from "../canvas/canvasSlice";
import { useState } from "react";
import Button from "../../ui/Button";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";
import { MdUndo } from "react-icons/md";

const StyledToolBar = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 2rem;
  pointer-events: none;
`;

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  /* justify-content: center; */
  align-items: end;

  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  pointer-events: none;
`;

const HideBarButton = styled(Button)`
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.5);
`;

function Toolbar() {
  const isDrawing = useSelector(getIsDrawing);
  const [showToolbar, setShowToolbar] = useState(true);

  return (
    !isDrawing && (
      <ToolbarContainer>
        <HideBarButton
          size={"smallEven"}
          onClick={() => setShowToolbar((showToolbar) => !showToolbar)}
        >
          {showToolbar ? <MdArrowRight /> : <MdArrowLeft />}
        </HideBarButton>
        {
          <StyledToolBar
            style={{
              opacity: showToolbar ? 1 : 0,
              pointerEvents: showToolbar ? "auto" : "none",
            }}
          >
            <ToolButton type={"freeHand"} preventEvents={!showToolbar}>
              <TbScribble />
            </ToolButton>
            <ToolButton type={"line"} preventEvents={!showToolbar}>
              <GoHorizontalRule style={{ transform: "rotate(90deg)" }} />
            </ToolButton>
            <ToolButton type={"arrow"} preventEvents={!showToolbar}>
              <BsArrowUp />
            </ToolButton>
            <ToolButton type={"freeHandArrow"} preventEvents={!showToolbar}>
              <MdUndo />
            </ToolButton>
            <ToolButton type={"circle"} preventEvents={!showToolbar}>
              <BsCircle />
            </ToolButton>
            {/* <ToolButton type={"angle"}>Angle</ToolButton> */}
            {/* <ToolButton type={"eraser"}>
          <FaEraser />
        </ToolButton> */}
          </StyledToolBar>
        }
      </ToolbarContainer>
    )
  );
}

export default Toolbar;
