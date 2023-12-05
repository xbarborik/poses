import styled, { css } from "styled-components";

const sizes = (size = "medium") =>
  ({
    smallEven: css`
      width: 2.3rem;
      height: 2.3rem;
    `,
    small: css`
      width: 3rem;
      height: 2rem;
    `,
    medium: css`
      width: 4rem;
      height: 3rem;
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

  border: none;
  font-size: 1.8rem;
  border-radius: 10px;

  ${({ size }) => sizes(size)}

  &:hover {
    background-color: #fff;
    cursor: pointer;
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
