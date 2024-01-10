import { GoHorizontalRule } from "react-icons/go";
import { BsCircle, BsArrowUp } from "react-icons/bs";
import ToolButton from "./ToolButton";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getIsDrawing } from "../canvas/canvasSlice";
import { useState } from "react";
import Button from "../../ui/Button";
import angleIcon from "../../assets/angle.svg";
import freehandArrowIcon from "../../assets/fr-ar.svg";
import freehandIcon from "../../assets/fr.svg";
import { TfiArrowsVertical } from "react-icons/tfi";
import { PiArrowsVerticalFill } from "react-icons/pi";

const StyledToolBar = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 1rem;
  pointer-events: none;
`;

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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

const IconImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
`;

const IconText = styled.span`
  font-size: 1.4rem;
`;

function Toolbar({ children }) {
  const isDrawing = useSelector(getIsDrawing);
  const [showToolbar, setShowToolbar] = useState(true);

  if (isDrawing) return null;

  return (
    <ToolbarContainer>
      {/* <HideBarButton
          size={"smallEven"}
          onClick={() => setShowToolbar((showToolbar) => !showToolbar)}
        >
          {showToolbar ? <MdArrowRight /> : <MdArrowLeft />}
        </HideBarButton> */}
      {children}
      {
        <StyledToolBar
          style={{
            opacity: showToolbar ? 1 : 0,
            pointerEvents: showToolbar ? "auto" : "none",
          }}
        >
          <ToolButton type={"freeHand"}>
            <IconImg src={freehandIcon} />
          </ToolButton>
          <ToolButton type={"line"}>
            <GoHorizontalRule style={{ transform: "rotate(90deg)" }} />
          </ToolButton>
          <ToolButton type={"freeHandArrow"}>
            <IconImg src={freehandArrowIcon} />
          </ToolButton>
          <ToolButton type={"arrow"}>
            {/* <BsArrowUp /> */}
            <PiArrowsVerticalFill />
          </ToolButton>
          <ToolButton type={"circle"}>
            <BsCircle />
          </ToolButton>
          <ToolButton type={"angle"}>
            <IconImg src={angleIcon} />
          </ToolButton>
          <ToolButton type={"comment"}>
            <IconText>Aa</IconText>
          </ToolButton>
          {/* <ToolButton type={"style"}>
            <IconText>col</IconText>
          </ToolButton> */}
          {/* <ToolButton type={"eraser"}>
          <FaEraser />
        </ToolButton> */}
        </StyledToolBar>
      }
    </ToolbarContainer>
  );
}

export default Toolbar;
