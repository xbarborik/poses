import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const StyledLoader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

function Loader() {
  return (
    <StyledLoader>
      <FadeLoader color={"black"} loading={true} size="15rem" />;
    </StyledLoader>
  );
}

export default Loader;
