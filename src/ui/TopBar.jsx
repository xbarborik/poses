import styled from "styled-components";

const StyledTopBar = styled.div`
  flex-grow: 1;
  width: 99%;
  display: flex;
  margin: 0 auto;
  padding: 0.5rem 0;
  align-items: center;
  justify-content: flex-end;
  gap: 0.1rem;

  @media only screen and (max-width: 768px) {
    /* flex-direction: column; */
  }
`;

function TopBar({ children }) {
  return <StyledTopBar id="top-bar">{children}</StyledTopBar>;
}

export default TopBar;
