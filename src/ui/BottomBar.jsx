import styled from "styled-components";

const StyledBottomBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function BottomBar({ children }) {
  return <StyledBottomBar id="bottom-bar">{children}</StyledBottomBar>;
}

export default BottomBar;
