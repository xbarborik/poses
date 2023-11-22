import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  height: 100dvh;
  overflow: hidden;
  width: 100vw;
  padding: 0.2rem;
  max-width: 1200px;
`;

function AppLayout({ children }) {
  return <StyledAppLayout>{children}</StyledAppLayout>;
}

export default AppLayout;
