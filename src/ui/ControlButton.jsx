import styled from "styled-components";
import { themes } from "../utils/themes";

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border-radius: 50%;
  background-color: ${themes.controls};
  padding: 0.2rem;
  border: none;
  pointer-events: auto;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;
  position: absolute; // Assuming you want this common too
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
  }
`;

export default ControlButton;
