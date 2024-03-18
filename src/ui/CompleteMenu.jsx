import { FaCheck } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import styled from "styled-components";

const MenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  border-radius: 50%;
  color: #393d47
  width: 2.8rem;
  height: 2.8rem;
  border: none;
  pointer-events: auto;
  background-color: #5897ee;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;
  position: absolute;
  bottom: 10px;
  right: 10px;
  opacity: ${(props) => (props.disabled ? 0 : 1)};

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

function CompleteMenu() {
  return (
    <>
      <MenuButton onClick={null}>
        <FaCheck />
      </MenuButton>
    </>
  );
}

export default CompleteMenu;
