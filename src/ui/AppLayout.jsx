import { Outlet } from "react-router";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;

  align-items: stretch;
  box-sizing: border-box;
  height: 100dvh;
  overflow: hidden;
  width: 100vw;
  max-width: 1250px;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
