import styled from "styled-components";
import Button from "../../ui/Button";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";

const StyledContainer = styled.div`
  display: flex;
  gap: 0.22rem;
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
  opacity: 60%;
  /* background-color: ; */

  &:hover {
    transform: scale(1.05);
  }

  @media only screen and (max-width: 768px) {
    width: 2.8rem;
    height: 2.8rem;
    font-size: 2rem;
    outline-width: 2px;
  }
`;

function UndoRedo() {
  return (
    <StyledContainer>
      <HistoryControlButton>
        <LiaUndoSolid />
      </HistoryControlButton>
      <HistoryControlButton>
        <LiaRedoSolid />
      </HistoryControlButton>
    </StyledContainer>
  );
}

export default UndoRedo;
