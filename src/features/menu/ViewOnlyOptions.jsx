/**
 * File: ViewOnlyOptions.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Available on if share via link is uncommented. It was a trial for showing a more interactive view.
 *    Instructor would share link to another person and the person could click on hotspots.
 */

import styled from "styled-components";
import { BASE } from "../../utils/constants";
import { downloadURI } from "../../utils/helpers";
import { CiSaveDown2, CiShare2 } from "react-icons/ci";
import { CgEditHighlight } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentImage,
  setIsExporting,
  toggleOpacityLowered,
} from "../canvas/canvasSlice";

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  border-radius: 50%;
  color: #393d47
  padding: 1rem;
  width: 2.8rem;
  height: 2.8rem;
  border: none;
  pointer-events: auto;
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  transition: 0.15s;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    background-color: #fff;
  }
`;

const Options = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
`;

function ViewOnlyOptions({ stageRef }) {
  const dispatch = useDispatch();
  const image = useSelector(getCurrentImage);

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
        stage.size({ height: stageSize.height, width: stageSize.width });
        downloadURI(
          stageRef.current.toDataURL({
            x: canvasImage.x(),
            y: canvasImage.y(),
            height: canvasImage.height() + commentArea.getClientRect().height,
            width: canvasImage.width(),
            pixelRatio: 2,
          }),
          `${image.id}.png`
        );
        stage.scale(currentScale);
        stage.position(currentPosition);
        stage.size(stageSize);
        dispatch(setIsExporting(false));
      }
    }, 100);
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

  return (
    <Options>
      <Button onClick={handleDownload}>
        <CiSaveDown2 />
      </Button>
      <Button onClick={() => dispatch(toggleOpacityLowered())}>
        <CgEditHighlight />
      </Button>
      <Button onClick={handleShare}>
        <CiShare2 />
      </Button>
    </Options>
  );
}

export default ViewOnlyOptions;
