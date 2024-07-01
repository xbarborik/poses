/**
 * File: UndoRedo.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    History control component. Adds undo and redo.
 */

import styled from "styled-components";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { isFutureEmpty, isPastEmpty, redo, undo } from "../canvas/canvasSlice";

const StyledContainer = styled.div`
  display: flex;
  gap: 0rem;
  padding: 0 0.2rem;
`;

const HistoryControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 1.5rem;
  border-radius: ${(props) =>
    props.$position === "left" ? "35% 0 0 35%" : "0 35% 35% 0"};
  width: 2.6rem;
  height: 1.8rem;
  border: none;
  pointer-events: auto;
  transition: 0.15s;

  opacity: ${(props) => (props.disabled ? 0.4 : 0.7)};
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

  &:active {
    transform: scale(1.05);
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }

  @media only screen and (max-width: 768px) {
    width: 2.4rem;
    height: 1.6rem;
    font-size: 2rem;
    outline-width: 2px;
  }
`;

function UndoRedo() {
  const dispatch = useDispatch();
  const isUndoDisabled = useSelector(isPastEmpty);
  const isRedoDisabled = useSelector(isFutureEmpty);

  return (
    <StyledContainer>
      <HistoryControlButton
        $position="left"
        onClick={() => dispatch(undo())}
        disabled={isUndoDisabled}
      >
        <LiaUndoSolid />
      </HistoryControlButton>
      <HistoryControlButton
        $position="right"
        onClick={() => dispatch(redo())}
        disabled={isRedoDisabled}
      >
        <LiaRedoSolid />
      </HistoryControlButton>
    </StyledContainer>
  );
}

export default UndoRedo;
