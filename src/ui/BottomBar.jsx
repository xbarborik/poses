import styled from "styled-components";

const StyledBottomBar = styled.div`
  flex-grow: 0.5;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function BottomBar({ children }) {
  return <StyledBottomBar id="bottom-bar">{children}</StyledBottomBar>;
}

export default BottomBar;
