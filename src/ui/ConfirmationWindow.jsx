import styled from "styled-components";
import { themes } from "../utils/themes";

const DarkOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const StyledConfirmationWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Message = styled.p`
  font-size: 1rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  font-family: ${themes.font}, sans-serif;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 8px 16px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: ${(props) => props.color};
  font-size: 1rem;
  flex: 1;

  &:hover {
    filter: brightness(0.9);
  }
`;

const ConfirmationWindow = ({
  message,
  onConfirm,
  onCancel,
  buttonText,
  buttonColor,
}) => {
  return (
    <DarkOverlay onClick={onCancel}>
      <StyledConfirmationWindow onClick={(e) => e.stopPropagation()}>
        <Message>{message}</Message>
        <ButtonWrapper>
          <Button onClick={onCancel} color={themes.secondary}>
            Zrušit
          </Button>
          <Button onClick={onConfirm} color={buttonColor}>
            {buttonText}
          </Button>
        </ButtonWrapper>
      </StyledConfirmationWindow>
    </DarkOverlay>
  );
};

export default ConfirmationWindow;
