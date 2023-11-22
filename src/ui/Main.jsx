import styled from "styled-components";

const StyledMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75%;
  /* flex-grow: 5; */
  position: relative;
`;

function Main({ children }) {
  return <StyledMain id="main">{children}</StyledMain>;
}

export default Main;
