import styled from "styled-components";

const StyledMain = styled.div`
  display: flex;
`;

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
