/**
 * File: Menu.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Menu button and modal for saving, deleting, or exporting content.
 */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoMenu, IoShareSocialOutline } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuSave } from "react-icons/lu";
import styled from "styled-components";
import {
  getCurrentImage,
  getIsImageSet,
  setIsExporting,
  setIsModified,
} from "../canvas/canvasSlice";
import { downloadURI } from "../../utils/helpers";
import { deletePoseFromCloud, uploadPose } from "../../utils/supabaseAPI";
import { themes } from "../../utils/themes";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import ConfirmationWindow from "../../ui/ConfirmationWindow";
import { GrDownload } from "react-icons/gr";

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
  background-color: rgba(255, 255, 255, 0.65);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;
  position: absolute;
  top: 10px;
  right: 10px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
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
  font-family: ${themes.font};
  font-size: 1.1rem;
  // color: white

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    filter: brightness(0.95);
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

function Menu({ stageRef, imageSize }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
  const disabled = useSelector(getIsImageSet) === false;
  const image = useSelector(getCurrentImage);
  const navigate = useNavigate();

  const handleDownload = () => {
    dispatch(setIsExporting(true));

    setTimeout(() => {
      const stage = stageRef.current;

      if (stage != null) {
        const canvasImage = stage.findOne(".poseImage");
        const currentScale = { x: stage.scaleX(), y: stage.scaleY() };
        const currentPosition = { x: stage.x(), y: stage.y() };
        const stageSize = { width: stage.width(), height: stage.height() };
        const commentArea = stage.findOne(".commentArea");

        stage.scale({ x: 1, y: 1 });
        stage.position({ x: 0, y: 0 });

        downloadURI(
          stageRef.current.toDataURL({
            x: canvasImage.x(),
            y: canvasImage.y(),
            height: canvasImage.height() + commentArea.getClientRect().height,
            width: canvasImage.width(),
            pixelRatio: 3,
          }),
          `${image.id}.png`
        );
        stage.scale(currentScale);
        stage.position(currentPosition);
        stage.size(stageSize);
        dispatch(setIsExporting(false));
      }
    }, 200);
  };

  // const handleShare = async (id) => {
  //   if (navigator.share) {
  //     navigator
  //       .share({
  //         title: "Zobraziť popis",
  //         text: "",
  //         url: `https://xbarborik.github.io${BASE}image/${id}?viewOnly=true`,
  //       })
  //       .then(() => console.log("Successful share"))
  //       .catch((error) => console.log("Error sharing", error));
  //   } else {
  //     console.log("Web Share API is not supported in this browser.");
  //   }
  // };

  const handleShareImageDirectly = async () => {
    dispatch(setIsExporting(true));

    setTimeout(async () => {
      const stage = stageRef.current;

      if (stage != null) {
        const canvasImage = stage.findOne(".poseImage");
        const commentArea = stage.findOne(".commentArea");
        const currentScale = { x: stage.scaleX(), y: stage.scaleY() };
        const currentPosition = { x: stage.x(), y: stage.y() };
        const stageSize = { width: stage.width(), height: stage.height() };

        stage.scale({ x: 1, y: 1 });
        stage.position({ x: 0, y: 0 });

        const dataUrl = stageRef.current.toDataURL({
          x: canvasImage.x(),
          y: canvasImage.y(),
          height: canvasImage.height() + commentArea.getClientRect().height,
          width: canvasImage.width(),
          pixelRatio: 3,
        });

        // Convert to Blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();

        // Convert to Blob
        const file = new File([blob], `${image.id}.png`, { type: "image/png" });

        if (navigator.share) {
          navigator.share({
            files: [file],
            title: "Asana",
            text: "Sdílení",
          });
        } else {
          console.log("Web Share API is not supported.");
        }

        stage.scale(currentScale);
        stage.position(currentPosition);
        stage.size(stageSize);
        dispatch(setIsExporting(false));
      }
    }, 200);
  };

  const handleUploadToCloud = async () => {
    const stage = stageRef.current;
    dispatch(setIsModified(false));
    const isSuccess = uploadPose(image.id, image.objects, {
      stage: stage.size(),
      image: imageSize,
    });

    return isSuccess;
  };

  async function handleDelete() {
    await deletePoseFromCloud(image.id);
    navigate("/");
  }

  function toggleMenu() {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <>
      <MenuButton onClick={toggleMenu}>
        <IoMenu />
      </MenuButton>
      {isOpen && (
        <MenuList>
          <MenuItem
            onClick={() => {
              toggleMenu();
              handleUploadToCloud();
              handleShareImageDirectly(image.id);
            }}
            disabled={disabled}
          >
            <IoShareSocialOutline /> Sdílet
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleDownload();
              toggleMenu();
            }}
            disabled={disabled}
          >
            <GrDownload /> Stáhnout
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleMenu();
              if (handleUploadToCloud()) {
                toast.success("Změny úspěšně uloženy");
              }
            }}
            disabled={disabled}
          >
            <LuSave /> Uložit změny
          </MenuItem>
          <MenuItem
            onClick={() => {
              toggleMenu();
              setShowConfirmation(true);
            }}
            disabled={disabled}
          >
            <FaRegTrashAlt /> Smazat
          </MenuItem>
        </MenuList>
      )}
      {showConfirmation && (
        <ConfirmationWindow
          message="Jste si jistý, že chcete smazat fotku?"
          onConfirm={() => {
            handleDelete();
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
          buttonText="Smazat"
          buttonColor={themes.danger}
        />
      )}
    </>
  );
}

export default Menu;
