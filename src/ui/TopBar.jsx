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

  bottom: 0;
  pointer-events: none;

  @media only screen and (max-width: 768px) {
    /* flex-direction: column; */
    // background: rgba(255, 255, 255, 0.2);
  }
`;

function TopBar({ children }) {
  return <StyledTopBar id="top-bar">{children}</StyledTopBar>;
}

export default TopBar;
