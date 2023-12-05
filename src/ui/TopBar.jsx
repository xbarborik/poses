import styled from "styled-components";

const StyledTopBar = styled.div`
  flex-grow: 0.7;
  width: 99%;
  display: flex;
  margin: 0 auto;
  padding: 0.2rem 0;
  box-sizing: border-box;
  align-items: center;
  /* justify-content: flex-end; */
  gap: 0.1rem;

  @media only screen and (max-width: 768px) {
    /* flex-direction: column; */
  }
`;

function TopBar({ children }) {
  return <StyledTopBar id="top-bar">{children}</StyledTopBar>;
}

export default TopBar;
