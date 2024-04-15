import { useRef, useState } from "react";
import { IoArrowBackSharp, IoMenu } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getCurrentImage,
  getIsImageSet,
  setImage,
} from "../features/canvas/canvasSlice";
import { RiImageAddFill } from "react-icons/ri";
import { CiSaveDown2, CiShare2 } from "react-icons/ci";
import { CiExport } from "react-icons/ci";
import {
  convertRelativeToAbsolute,
  downloadURI,
  idFromDate,
} from "../utils/helpers";
import { uploadImageAndPose } from "../utils/supabaseClient";
import { BASE } from "../utils/constants";
import { useNavigate } from "react-router";
import { LuSave } from "react-icons/lu";
import { toast } from "react-toastify";
import { GrGallery } from "react-icons/gr";
import { setShowStyling } from "../features/stylePanel/styleSlice";
import { themes } from "../utils/themes";

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
  right: 10px;
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
  background-color: ${themes.background};
  border: none;
  border-radius: 5px;
  margin: 2px
  width: 100%;
  text-align: left;
  cursor: pointer;
  transition: 0.15s;
  font-family: "Raleway";
  font-size: 1.1rem;
  // color: white

  &:hover {
    // background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
`;

const MenuList = styled.div`
  display: flex;
  z-index: 999;
  flex-direction: column;
  position: absolute;
  top: 55px;
  right: 10px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;

const ImageInput = styled.input`
  display: none;
`;

function Menu({ stageRef, imageFile, setImageFile }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const disabled = useSelector(getIsImageSet) === false;
  const image = useSelector(getCurrentImage);
  const navigate = useNavigate();

  const handleDownload = () => {
    const stage = stageRef.current;

    if (stage != null) {
      const canvasImage = stage.findOne(".poseImage");
      const currentScale = { x: stage.scaleX(), y: stage.scaleY() };
      const currentPosition = { x: stage.x(), y: stage.y() };
      const stageSize = { width: stage.width(), height: stage.height() };

      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
      stage.size({ height: stageSize.height + 400, width: stageSize.width });
      console.log(image);
      downloadURI(
        stageRef.current.toDataURL({
          x: canvasImage.x(),
          y: canvasImage.y(),
          height: canvasImage.height(),
          width: canvasImage.width(),
          pixelRatio: 2,
        }),
        `${image.id}.png`
      );
      stage.scale(currentScale);
      stage.position(currentPosition);
      stage.size(stageSize);
    }
  };

  const handleShare = async (id) => {
    if (navigator.share) {
      navigator
        .share({
          title: "Zobraziť popis",
          text: "",
          url: `https://xbarborik.github.io${BASE}image/${id}?viewOnly=true`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };

  const handleUploadFromGallery = () => {
    inputRef.current.click();
  };

  const handleUploadToCloud = async () => {
    const stage = stageRef.current;
    const isSuccess = uploadImageAndPose(
      {
        ...image,
        objects: convertRelativeToAbsolute(image.objects, stage.size()),
        originalSize: stage.size(),
      },
      imageFile
    );
    if (isSuccess) {
      toast.success("Změny úspěšně uloženy");
    } else {
      toast.error("Vyžaduje se připojení k internetu");
    }

    return isSuccess;
  };

  const handleImageUpload = (e) => {
    const newId = idFromDate();
    const file = e.target.files[0];

    setImageFile(file);
    dispatch(
      setImage({
        id: newId,
        objects: {},
        path: URL.createObjectURL(file),
      })
    );
    dispatch(setShowStyling(true));
    navigate(`${BASE}image/${newId}`);
  };

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
    dispatch(setShowStyling(false));
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
              handleUploadFromGallery();
              toggleMenu();
            }}
          >
            <RiImageAddFill /> Nahrát z galerie
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDownload();
              toggleMenu();
            }}
            disabled={disabled}
          >
            <CiSaveDown2 /> Stáhnout
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleMenu();
              handleUploadToCloud();
              handleShare(image.id);
            }}
            disabled={disabled}
          >
            <CiShare2 /> Sdílet
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleMenu();
              handleUploadToCloud();
            }}
            disabled={disabled}
          >
            <LuSave /> Uložit změny
          </MenuItem>
        </MenuList>
      )}
    </>
  );
}

export default Menu;
