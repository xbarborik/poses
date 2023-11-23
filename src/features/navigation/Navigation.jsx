import styled from "styled-components";
import Button from "../../ui/Button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 0.5rem;
  margin: auto;
  box-sizing: border-box;
`;

function Navigation({ index, setIndex, maxIndex }) {
  function handleNext() {
    if (index < maxIndex) setIndex((curIndex) => curIndex + 1);
  }

  function handlePrevious() {
    if (index > 0) setIndex((curIndex) => curIndex - 1);
  }

  return (
    <StyledNavigation>
      <Button onClick={handlePrevious}>
        <SlArrowLeft />
      </Button>
      <Button onClick={handleNext}>
        <SlArrowRight />
      </Button>
    </StyledNavigation>
  );
}

export default Navigation;
