import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getIsImageSet,
  getOpacityLowered,
  toggleOpacityLowered,
} from "../features/canvas/canvasSlice";
import { CgEditHighlight } from "react-icons/cg";
import ControlButton from "./ControlButton";

const OpacityButton = styled(ControlButton)`
  top: 3.5rem;
  left: 10px;
`;

function Opacity() {
  const dispatch = useDispatch();
  const disabled = useSelector(getIsImageSet) === false;
  const isActive = useSelector(getOpacityLowered);

  function handleClick() {
    dispatch(toggleOpacityLowered());
  }

  return (
    <>
      <OpacityButton
        onClick={handleClick}
        disabled={disabled}
        $isActive={isActive}
      >
        <CgEditHighlight />
      </OpacityButton>
    </>
  );
}

export default Opacity;
