import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  align-items: stretch;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  max-width: 1250px;
`;

function AppLayout({ children }) {
  return <StyledAppLayout>{children}</StyledAppLayout>;
}

export default AppLayout;
