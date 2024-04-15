import { GoHorizontalRule } from "react-icons/go";
import { BsCircle } from "react-icons/bs";
import ToolButton from "./ToolButton";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  getIsImageSet,
  getIsDragging,
  getIsDrawing,
} from "../canvas/canvasSlice";
import { useState } from "react";
import Button from "../../ui/Button";
import angleIcon from "../../assets/ang.svg";
import freehandArrowIcon from "../../assets/fr-ar.svg";
import freehandIcon from "../../assets/fr.svg";
import { LuMoveVertical } from "react-icons/lu";
import { getColor } from "../stylePanel/styleSlice";
import { FaRegEye } from "react-icons/fa";

const StyledToolBar = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.8rem;
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
  // bottom: 1rem;
  transform: translateY(-50%);

  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  pointer-events: ${(props) => (props.$disabled ? "none" : "none")};
`;

const HideBarButton = styled(Button)`
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.5);
`;

const IconImg = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  color: ${(props) => props.$color};
`;

const IconText = styled.span`
  font-size: 1.4rem;
`;

function Toolbar({ children }) {
  const isDrawing = useSelector(getIsDrawing);
  const isDragging = useSelector(getIsDragging);
  const color = useSelector(getColor);
  const [showToolbar, setShowToolbar] = useState(true);
  const disabled = useSelector(getIsImageSet) === false;

  if (isDrawing || isDragging) return null;

  return (
    <ToolbarContainer $disabled={disabled}>
      {/* <HideBarButton
        size={"smallEven"}
        onClick={() => setShowToolbar((showToolbar) => !showToolbar)}
      >
        {showToolbar ? "<" : ">"}
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
            <IconImg src={freehandIcon} $color={color} />
          </ToolButton>
          <ToolButton type={"line"}>
            <GoHorizontalRule style={{ transform: "rotate(90deg)" }} />
          </ToolButton>
          <ToolButton type={"freeHandArrow"}>
            <IconImg src={freehandArrowIcon} $color={color} />
          </ToolButton>
          <ToolButton type={"arrow"}>
            <LuMoveVertical />
          </ToolButton>
          <ToolButton type={"circle"}>
            <BsCircle />
          </ToolButton>
          <ToolButton type={"angle"}>
            <IconImg src={angleIcon} $color={color} />
          </ToolButton>
          <ToolButton type={"comment"}>
            <IconText>Aa</IconText>
          </ToolButton>
          <ToolButton type={"focus"} showStyling={false}>
            <FaRegEye />
          </ToolButton>
        </StyledToolBar>
      }
    </ToolbarContainer>
  );
}

export default Toolbar;
