import styled from "styled-components";

const StyledBottomBar = styled.div`
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
`;

function BottomBar({ children }) {
  return <StyledBottomBar id="bottom-bar">{children}</StyledBottomBar>;
}

export default BottomBar;
