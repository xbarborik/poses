/**
 * File: canvasSlice.js
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *  Card component for gallery grid
 */
import styled from "styled-components";

/*
  Styling of cards evenly.
  Source: https://css-tricks.com/a-grid-of-logos-in-squares/
*/
const StyledCard = styled.div`
  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  position: relative;
  width: 100%;

  &:hover {
    cursor: pointer;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 5px;
`;
function Card({ onClick, image }) {
  return (
    <StyledCard onClick={onClick}>
      <Image src={image} />
    </StyledCard>
  );
}

export default Card;
