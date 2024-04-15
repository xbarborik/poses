import styled from "styled-components";

const StyledTopBar = styled.div`
  width: 100%;
  display: flex;
  border-radius: 0 0 20px 20px;
  gap: 0.1rem;
  z-index: 99;
  box-sizing: border-box;
  justify-content: center;

  position: absolute;

  top: 0;
  pointer-events: none;
`;

function TopBar({ children }) {
  return <StyledTopBar id="top-bar">{children}</StyledTopBar>;
}

export default TopBar;
