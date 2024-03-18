import React, { useRef, useState } from "react";
import { IoArrowBackSharp, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getCurrentImage,
  getImagesCount,
  setImages,
} from "../features/canvas/canvasSlice";
import { RiImageAddFill } from "react-icons/ri";
import { CiShare2 } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import UploadIcon from "../assets/uploadIcon";
import { downloadURI } from "../utils/helpers";
import {
  uploadPose,
  uploadImage,
  fetchPoseById,
  getPoseImageUrl,
  fetchLatestPose,
} from "../utils/supabaseClient";
import { setShowStyling } from "../features/stylePanel/styleSlice";

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
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
    cursor: pointer;
  }
`;

const MenuItem = styled.button`
  display: flex;
  z-index: 999;
  align-items: center;
  gap: 5px;
  padding: 0.5rem 1rem;
  margin: 0.2rem 0;
  background-color: rgba(255, 255, 255, 1);
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
  display: flex;
  z-index: 999;
  flex-direction: column;
  position: absolute;
  top: 55px;
  left: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ImageInput = styled.input`
  display: none;
`;

function Menu({ stageRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const disabled = useSelector(getImagesCount) == 0;
  const image = useSelector(getCurrentImage);

  const handleExport = () => {
    const stage = stageRef.current;

    if (stage != null) {
      const image = stage.findOne(".poseImage");
      const currentScale = { x: stage.scaleX(), y: stage.scaleY() };
      const currentPosition = { x: stage.x(), y: stage.y() };
      const stageSize = { width: stage.width(), height: stage.height() };

      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
      stage.size({ height: stageSize.height + 400, width: stageSize.width });

      downloadURI(
        stageRef.current.toDataURL({
          x: image.x(),
          y: image.y(),
          height: image.height(),
          width: image.width(),
          pixelRatio: 2,
        }),
        "stage.png"
      );
      stage.scale(currentScale);
      stage.position(currentPosition);
      stage.size(stageSize);
      console.log(image);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Example Title",
          text: "Example text to share.",
          url: "https://xbarborik.github.io/poses/",
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };

  const handleUploadButtonClick = () => {
    inputRef.current.click();
  };

  const handleUploadToCloud = async () => {
    // const { data, error } = await uploadImage("test.png", image.file);

    // console.log(data);
    const path = "test.png";
    const { data, error } = uploadPose(image.id, path, image.objects);
    if (error) {
      alert("Upload failed");
    } else {
      alert("Upload success");
    }
  };

  const handleImageUpload = (e) => {
    const filesArray = Array.from(e.target.files).map((file, index) => ({
      id: index,
      objects: {},
      path: URL.createObjectURL(file),
      file: file,
    }));

    dispatch(setImages(filesArray));
  };

  const handleLoad = async (id) => {
    // const result = await fetchPoseById(id);
    const result = await fetchLatestPose();
    const pose = [
      {
        id: result.id,
        objects: result.objects,
        path: getPoseImageUrl(result.image),
        file: null,
      },
    ];
    dispatch(setImages(pose));
    dispatch(setShowStyling(true));
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

      <MenuButton onClick={toggleMenu}>
        <IoMenu />
      </MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem
            onClick={() => {
              dispatch(setImages([]));
              toggleMenu();
            }}
          >
            <IoArrowBackSharp /> Zpět
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleUploadButtonClick();
              toggleMenu();
            }}
          >
            <RiImageAddFill /> Nahrát z galerie
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleExport();
              toggleMenu();
            }}
            disabled={disabled}
          >
            <CiExport /> Exportovat
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleMenu();
              handleShare();
            }}
          >
            <CiShare2 /> Sdílet
          </MenuItem>
          {/* <MenuItem
            onClick={() => {
              toggleMenu();
              handleUploadToCloud();
            }}
            disabled={disabled}
          >
            Nahrát
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleMenu(), handleLoad();
            }}
          >
            Načíst
          </MenuItem> */}
        </MenuList>
      )}
    </>
  );
}

export default Menu;
