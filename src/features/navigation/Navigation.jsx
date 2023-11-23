import styled from "styled-components";
import Button from "../../ui/Button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentImageIndx,
  getImagesCount,
  setCurrentImageIndx,
} from "../canvas/canvasSlice";

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 0.5rem;
  margin: auto;
  box-sizing: border-box;
`;

function Navigation() {
  const index = useSelector(getCurrentImageIndx);
  const maxIndex = useSelector(getImagesCount) - 1;
  const dispatch = useDispatch();
  const setIndex = (index) => dispatch(setCurrentImageIndx(index));

  function handleNext() {
    if (index < maxIndex) setIndex(index + 1);
  }

  function handlePrevious() {
    if (index > 0) setIndex(index - 1);
  }

  return (
    <StyledNavigation>
      <Button onClick={handlePrevious} disabled={index === 0}>
        <SlArrowLeft />
      </Button>

      <Button onClick={handleNext} disabled={index === maxIndex}>
        <SlArrowRight />
      </Button>
    </StyledNavigation>
  );
}

export default Navigation;
