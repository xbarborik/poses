import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { BASE } from "../utils/constants";
import { useNavigate } from "react-router";
import GalleryList from "../features/gallery/GalleryList";

const BackButton = styled.button`
display: flex;
align-items: center;
justify-content: center;
font-size: 1.8rem;
border-radius: 50%;
color: #393d47
width: 2.4rem;
height: 2.4rem;
border: none;
pointer-events: auto;
background-color: rgba(255, 255, 255, 0.5);
box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
transition: 0.15s;
position: absolute;
top: 10px;
left: 10px;
opacity: ${(props) => (props.disabled ? 0.5 : 1)};

&:hover {
  transform: scale(1.05);
  background-color: #fff;
  cursor: pointer;
}
`;

function Gallery() {
  const navigate = useNavigate();

  return (
    <>
      <BackButton onClick={() => navigate(BASE)}>
        <IoArrowBackSharp />
      </BackButton>
      <GalleryList />
    </>
  );
}

export default Gallery;
