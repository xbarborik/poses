import styled from "styled-components";
import Button from "../../ui/Button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const StyledNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  padding: 1rem;
  margin: auto;
`;

function Navigation() {
  return (
    <StyledNavigation>
      <Button>
        <SlArrowLeft />
      </Button>
      <Button>
        <SlArrowRight />
      </Button>
    </StyledNavigation>
  );
}

export default Navigation;
