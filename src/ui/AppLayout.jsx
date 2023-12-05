import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  box-sizing: border-box;
  height: 98vh;
  overflow: hidden;
  width: 100vw;
  padding: 0.2rem;
  max-width: 1200px;
`;

function AppLayout({ children }) {
  return <StyledAppLayout>{children}</StyledAppLayout>;
}

export default AppLayout;
