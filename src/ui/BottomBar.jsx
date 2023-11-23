import styled from "styled-components";

const StyledBottomBar = styled.div`
  flex-grow: 1;
  width: 100%;
`;

function BottomBar({ children }) {
  return <StyledBottomBar id="bottom-bar">{children}</StyledBottomBar>;
}

export default BottomBar;
