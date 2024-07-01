import styled, { css } from "styled-components";

const sizes = (size = "medium") =>
  ({
    smallEven: css`
      width: 2.3rem;
      height: 2.3rem;
    `,
    small: css`
      width: 2.5rem;
      height: 1.6rem;
    `,
    medium: css`
      width: 3rem;
      height: 2rem;
    `,
    large: css`
      width: 5rem;
      height: 4rem;
    `,
  }[size]);

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color || "#bbbbbb"};
  cursor: pointer;
  border: none;
  font-size: 1.5rem;
  border-radius: 10px;

  ${({ size }) => sizes(size)}

  &:hover {
    background-color: #fff;
  }

  &:disabled {
    opacity: 0.6;
  }
`;

function Button({ className, children, onClick, size }) {
  return (
    <StyledButton className={className} onClick={onClick} size={size}>
      {children}
    </StyledButton>
  );
}

export default Button;
