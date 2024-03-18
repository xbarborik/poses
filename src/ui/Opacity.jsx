import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getImagesCount,
  toggleOpacityLowered,
} from "../features/canvas/canvasSlice";
import { GrFormViewHide } from "react-icons/gr";
import { CgEditHighlight } from "react-icons/cg";

const OpacityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  border-radius: 50%;
  color: #393d47
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;
  position: absolute;
  top: 3.5rem;
  left: 10px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
    cursor: pointer;
  }
`;

function Opacity() {
  const dispatch = useDispatch();
  const disabled = useSelector(getImagesCount) == 0;

  function handleClick() {
    dispatch(toggleOpacityLowered());
  }

  return (
    <>
      <OpacityButton onClick={handleClick} disabled={disabled}>
        <CgEditHighlight />
      </OpacityButton>
    </>
  );
}

export default Opacity;
