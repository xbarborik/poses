import styled from "styled-components";
import Button from "../../ui/Button";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";

const StyledContainer = styled.div`
  display: flex;
  gap: 1 rem;
`;

const HistoryControlButton = styled(Button)`
  &:hover {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    border-radius: 50%;
    width: 5rem;
    height: 5rem;
    border: none;
    pointer-events: auto;

    background-color: red;
    transform: scale(1.2);
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
