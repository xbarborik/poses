/**
 * File: Toolbar.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Component for displaying all Toolbuttons and any other special tools given through children.
 */

import { GoHorizontalRule } from "react-icons/go";
import { BsCircle } from "react-icons/bs";
import ToolButton from "./ToolButton";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { GiLookAt } from "react-icons/gi";
import {
  getIsImageSet,
  getIsDragging,
  getIsDrawing,
} from "../canvas/canvasSlice";
import angleIcon from "../../assets/ang.svg";
import freehandArrowIcon from "../../assets/frar_wider.svg";
import freehandIcon from "../../assets/fr.svg";
import { LuArrowUp, LuMoveVertical } from "react-icons/lu";

const StyledToolBar = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 0.65rem;
  pointer-events: none;
  margin-right: 0.4rem;
`;

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: fit-content;
  align-items: end;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.$disabled ? "none" : "none")};
`;

const IconImg = styled.img`
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};
  color: ${(props) => props.$color};
`;

const IconText = styled.span`
  font-size: 1.2rem;
`;

function Toolbar({ children }) {
  const isDrawing = useSelector(getIsDrawing);
  const isDragging = useSelector(getIsDragging);
  const disabled = useSelector(getIsImageSet) === false;

  if (isDrawing || isDragging) return null;

  return (
    <ToolbarContainer $disabled={disabled}>
      {children}
      {
        <StyledToolBar>
          <ToolButton type={"freeHand"}>
            <IconImg src={freehandIcon} $size="1.5rem" />
          </ToolButton>
          <ToolButton type={"line"}>
            <GoHorizontalRule style={{ transform: "rotate(90deg)" }} />
          </ToolButton>
          <ToolButton type={"freeHandArrow"}>
            <IconImg src={freehandArrowIcon} $size="1.5rem" />
          </ToolButton>
          <ToolButton type={"arrow"}>
            <LuArrowUp />
          </ToolButton>
          <ToolButton type={"doubleSidedArrow"}>
            <LuMoveVertical />
          </ToolButton>
          <ToolButton type={"circle"}>
            <BsCircle />
          </ToolButton>
          <ToolButton type={"angle"}>
            <IconImg src={angleIcon} $size="1.8rem" />
          </ToolButton>
          <ToolButton type={"focusArrow"} fontSize="10rem">
            <GiLookAt style={{ transform: "scale(1.4)" }} />
          </ToolButton>
          <ToolButton type={"comment"}>
            <IconText>Aa</IconText>
          </ToolButton>
        </StyledToolBar>
      }
    </ToolbarContainer>
  );
}

export default Toolbar;
