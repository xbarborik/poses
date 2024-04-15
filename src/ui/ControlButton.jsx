import styled from "styled-components";

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border-radius: 50%;
  color: #393d47;
  width: 2.2rem;
  height: 2.2rem;
  border: none;
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;
  position: absolute; // Assuming you want this common too
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
    cursor: pointer;
  }
`;

export default ControlButton;
