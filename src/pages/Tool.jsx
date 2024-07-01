/**
 * File: Tool.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Page used in router, view of canvas
 */

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import styled from "styled-components";
import Canvas from "../features/canvas/Canvas";
import Focus from "../features/tools/Focus";
import StylePalette from "../features/stylePalette/StylePalette";
import Toolbar from "../features/toolbar/Toolbar";
import UndoRedo from "../features/history/UndoRedo";
import {
  getCurrentImage,
  getIsDragging,
  getIsDrawing,
  getIsImageSet,
  getIsModified,
  setImage,
  setViewOnly,
} from "../features/canvas/canvasSlice";
import { getSelectedTool } from "../features/toolbar/toolbarSlice";
import { loadFromId, uploadPose } from "../utils/supabaseAPI";
import BottomBar from "../ui/BottomBar";
import ControlButton from "../ui/ControlButton";
import Loader from "../ui/Loader";
import Overlay from "../features/canvas/Overlay";
import Menu from "../features/menu/Menu";
import ViewOnlyOptions from "../features/menu/ViewOnlyOptions";
import { convertAbsoluteToRelative } from "../utils/helpers";
import ConfirmationWindow from "../ui/ConfirmationWindow";
import { themes } from "../utils/themes";

const BackButton = styled(ControlButton)`
  top: 10px;
  left: 10px;
`;

function Tool({ imageFile, setImageFile }) {
  const [isLoading, setIsLoading] = useState(false);
  const stageRef = useRef(null);
  const dispatch = useDispatch();
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0,
    scale: 0,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const viewOnly = searchParams.get("viewOnly");
  const isDrawing = useSelector(getIsDrawing);
  const isImageSet = useSelector(getIsImageSet);
  const isDragging = useSelector(getIsDragging);
  const selectedTool = useSelector(getSelectedTool);
  const image = useSelector(getCurrentImage);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isCanvasModified = useSelector(getIsModified);

  useEffect(() => {
    dispatch(setViewOnly(viewOnly || false));
  }, [viewOnly, dispatch]);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const poses = await loadFromId(id);

      if (poses === null || !poses) {
        console.log("Failed to load pose from Id");
      } else {
        const pose = poses[0];
        const objectsWithRelativePoints = convertAbsoluteToRelative(
          pose.objects,
          pose.originalSize.stage,
          pose.originalSize.image
        );

        const withRelativePoints = {
          ...pose,
          objects: objectsWithRelativePoints,
        };

        dispatch(setImage(withRelativePoints));
      }
      setIsLoading(false);
    }

    if (id) load();
  }, [id, dispatch]);

  const handleUploadToCloud = async () => {
    const stage = stageRef.current;
    const isSuccess = uploadPose(image.id, image.objects, {
      stage: stage.size(),
      image: imageSize,
    });

    return isSuccess;
  };

  if (viewOnly === "true")
    return (
      <>
        <Overlay stageRef={stageRef}>
          {!isImageSet || isLoading ? (
            <Loader />
          ) : (
            <Canvas
              stageRef={stageRef}
              imageSize={imageSize}
              setImageSize={setImageSize}
            />
          )}
        </Overlay>
        <ViewOnlyOptions stageRef={stageRef} />
      </>
    );

  return (
    <>
      <Overlay stageRef={stageRef}>
        {!isImageSet || isLoading ? (
          <Loader />
        ) : (
          <Canvas
            stageRef={stageRef}
            imageSize={imageSize}
            setImageSize={setImageSize}
          />
        )}
        <Toolbar>
          <UndoRedo />
        </Toolbar>
      </Overlay>
      <BottomBar>
        <StylePalette />
      </BottomBar>

      {!isDrawing && !isDragging && (
        <>
          <Menu
            stageRef={stageRef}
            imageSize={imageSize}
            imageFile={imageFile}
            setImageFile={setImageFile}
          />
          {/* <Opacity /> */}
          <Focus show={selectedTool === "focus"} />
          <BackButton
            onClick={() => {
              if (isCanvasModified) setShowConfirmation(true);
              else navigate("/");
            }}
          >
            <IoArrowBackSharp />
          </BackButton>
        </>
      )}
      {showConfirmation && (
        <ConfirmationWindow
          message="Chcete uložit změny?"
          onConfirm={() => {
            handleUploadToCloud();
            setShowConfirmation(false);
            navigate("/");
          }}
          onCancel={() => {
            setShowConfirmation(false);
            navigate("/");
          }}
          buttonText="Uložit"
          buttonColor={themes.primary}
        />
      )}
    </>
  );
}

export default Tool;
