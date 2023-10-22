import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function AppLayout() {
  return <StyledAppLayout></StyledAppLayout>;
}

export default AppLayout;
