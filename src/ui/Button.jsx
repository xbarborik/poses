import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color || "#bbbbbb"};
  width: 4rem;
  height: 3rem;
  border: none;
  font-size: 1.5rem;
  border-radius: 10px;

  &:hover {
    background-color: #fff;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

function Button({ children, onClick }) {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

export default Button;
