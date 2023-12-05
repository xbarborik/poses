import styled from "styled-components";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { isFutureEmpty, isPastEmpty, redo, undo } from "../canvas/canvasSlice";
import { useEffect } from "react";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0 0.2rem;
`;

const HistoryControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 2rem;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  border: none;
  pointer-events: auto;

  opacity: ${(props) => (props.disabled ? 0.4 : 0.6)};

  &:active {
    transform: scale(1.05);
  }

  &:hover {
    cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  }

  @media only screen and (max-width: 768px) {
    width: 2.8rem;
    height: 2.8rem;
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
        onClick={() => dispatch(undo())}
        disabled={isUndoDisabled}
      >
        <LiaUndoSolid />
      </HistoryControlButton>
      <HistoryControlButton
        onClick={() => dispatch(redo())}
        disabled={isRedoDisabled}
      >
        <LiaRedoSolid />
      </HistoryControlButton>
    </StyledContainer>
  );
}

export default UndoRedo;
