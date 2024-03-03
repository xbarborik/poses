import React, { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getImagesCount, setImages } from "../features/canvas/canvasSlice";
import { RiImageAddFill } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import UploadIcon from "../assets/uploadIcon";

const MenuButton = styled.button`
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
  opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
    cursor: pointer;
  }
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.5rem 1rem;
  margin: 0.2rem 0;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-radius: 5px;
  margin: 2px
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: 0.15s;
  font-family: "Raleway";
  font-size: 1.1rem;
  color: #393d47

  &:hover {
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;

const MenuList = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  position: absolute;
  top: 55px;
  left: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ImageInput = styled.input`
  display: none;
`;

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const disabled = useSelector(getImagesCount) == 0;

  const handleUploadButtonClick = () => {
    inputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const filesArray = Array.from(e.target.files).map((file, index) => ({
      id: index,
      path: URL.createObjectURL(file),
    }));

    dispatch(setImages(filesArray));
  };

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <>
      <ImageInput
        ref={inputRef}
        type="file"
        name="myImage"
        onChange={handleImageUpload}
        multiple
      />

      <MenuButton onClick={toggleMenu} disabled={disabled}>
        <IoMenu />
      </MenuButton>
      <MenuList show={isOpen}>
        <MenuItem
          onClick={() => {
            handleUploadButtonClick();
            toggleMenu();
          }}
        >
          <RiImageAddFill /> Nahrát z galerie
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <CiExport /> Exportovat
        </MenuItem>
        <MenuItem onClick={toggleMenu}>
          <CiShare2 /> Sdílet
        </MenuItem>
        {/* Add more MenuItem as needed */}
      </MenuList>
    </>
  );
}

export default Menu;
