/**
 * File: Canvas.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description: This React component manages an interactive canvas for annotating poses using React-Konva.
 * It integrates with Redux for state management, providing tools for drawing, commenting, and
 * manipulating pose images. It also handles UI interactions such as touch and mouse input to manipulate
 * the canvas objects and annotations.
 */

import styled from "styled-components";
import { Stage, Layer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectObject,
  getIsDrawing,
  getObjects,
  getSelectedObjectId,
  getViewOnly,
  redo,
  selectObject,
  setIsDrawing,
  setStagePos,
  setStageScale,
  undo,
  updateHistory,
  updateWithObject,
} from "./canvasSlice";
import {
  getStrokeWidth,
  selectColor,
  setStrokeWidth,
} from "../stylePalette/styleSlice";
import { getSelectedTool, selectTool } from "../toolbar/toolbarSlice";
import { useEffect, useRef, useState } from "react";
import {
  smoothLine,
  outOfBounds,
  notLongEnoughToDraw,
  convertRelativeToAbsolute,
} from "../../utils/helpers";
import FreeHand from "../tools/FreeHand";
import { updateFreeHand } from "../tools/freeHandUtils";
import Arrow from "../tools/Arrow";
import Line from "../tools/Line";
import { updateLine } from "../tools/lineUtils";
import PoseImage from "./PoseImage";
import { updateCircle } from "../tools/circleUtils";
import { useDimensions } from "./useDimensions";
import useClickOutsideContainer from "../../hooks/useClickOutsideContainer";
import Circle from "../tools/CircleFromCorner";
import { getColor } from "../stylePalette/styleSlice";
import useCtrlAndKeyDown from "../../hooks/useCtrlAndKeyDown";
import { useMultiTouchScale } from "./useMultiTouchZoom";
import { useWheelAndTouchpadZoom } from "./useWheelAndTouchpadZoom";
import FreeHandArrow from "../tools/FreeHandArrow";
import Angle from "../tools/Angle";
import { updateAngle } from "../tools/angleUtils";
import Comment from "../tools/Comment";
import { themes } from "../../utils/themes";
import CommentArea from "../commentArea/CommentArea";
import { STARTING_CANVAS_SCALE } from "../../utils/constants";
import FocusArrow from "../tools/FocusArrow";

const StyledCanvas = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overscroll-behavior: none;
  background-color: ${themes.canvasBackground};
  zoom: 1;
`;

function getRelativePointerPosition(stageRef) {
  const stage = stageRef.current;
  return stage.getRelativePointerPosition();
}

function Canvas({ stageRef, imageSize, setImageSize, isLoading = false }) {
  const dispatch = useDispatch();
  const canvasRef = useRef(null); // References the canvas DOM for direct manipulations and measurements

  // Retrieves drawing state and object properties from Redux store
  const objects = useSelector(getObjects);
  const isDrawing = useSelector(getIsDrawing);
  const strokeWidth = useSelector(getStrokeWidth);
  const selectedColor = useSelector(getColor);
  const selectedTool = useSelector(getSelectedTool);
  const selectedObjectId = useSelector(getSelectedObjectId);
  const viewOnly = useSelector(getViewOnly);

  // Custom hook for handling dimensions based on the canvas reference
  const [dimensions] = useDimensions(canvasRef);

  // Local states
  const [adjustedObjects, setAdjustedObjects] = useState({});
  const [newObject, setNewObject] = useState({});

  // Custom hooks for managing zoom on the canvas
  useMultiTouchScale(stageRef, dimensions);
  useWheelAndTouchpadZoom(stageRef, dimensions);

  // Event listeners for global actions like undo/redo
  useCtrlAndKeyDown("z", () => dispatch(undo()));
  useCtrlAndKeyDown("y", () => dispatch(redo()));

  const {
    scale: scaleAfterMultitouch,
    handleMultiTouchMove,
    handleMultiTouchEnd,
    pos: posAfterMultitouch,
  } = useMultiTouchScale(stageRef, dimensions, 0.8);

  const {
    scale: scaleAfterWheel,
    handleWheel,
    pos: posAfterWheel,
  } = useWheelAndTouchpadZoom(stageRef, dimensions, 0.8);

  const outsideClickException = "adjust";
  useClickOutsideContainer(
    canvasRef,
    () => dispatch(deselectObject()),
    outsideClickException
  );

  useCtrlAndKeyDown("z", () => dispatch(undo()));
  useCtrlAndKeyDown("y", () => dispatch(redo()));

  useEffect(() => {
    const withAdjustedPoints = convertRelativeToAbsolute(
      objects,
      dimensions,
      imageSize
    );
    setAdjustedObjects(withAdjustedPoints);
  }, [objects, dimensions, imageSize]);

  useEffect(() => {
    dispatch(setStagePos(posAfterWheel));
    dispatch(setStageScale(scaleAfterWheel));
  }, [scaleAfterWheel, dispatch, posAfterWheel]);

  useEffect(() => {
    dispatch(setStagePos(posAfterMultitouch));
    dispatch(setStageScale(scaleAfterMultitouch));
  }, [scaleAfterMultitouch, dispatch, posAfterMultitouch]);

  // Reset scale on dimensions change
  useEffect(() => {
    const stage = stageRef.current;
    if (stage != null) {
      dispatch(setStageScale(STARTING_CANVAS_SCALE));
      stage.scale({ x: STARTING_CANVAS_SCALE, y: STARTING_CANVAS_SCALE });
      stage.position({
        x: (dimensions.width * (1 - STARTING_CANVAS_SCALE)) / 2,
        y: (dimensions.height * (1 - STARTING_CANVAS_SCALE)) / 2,
      });
    }
  }, [dispatch, stageRef, dimensions]);

  useEffect(() => {
    if (selectedObjectId === newObject.id) {
      setNewObject({});
    }
  }, [selectedObjectId, newObject.id]);

  function isButtonOrAnchor(e) {
    const name = e?.target?.attrs?.name;
    return name?.includes("anchor") || name?.includes("adjust");
  }

  // Handles initial event for drawing or selecting objects based on the current tool and object state.
  function handleStart(e) {
    e.evt.preventDefault();

    const position = getRelativePointerPosition(stageRef);

    const clickedObjectId = e.target.id();

    if (clickedObjectId === selectedObjectId) {
      return;
    } else if (!isButtonOrAnchor(e) && selectedObjectId !== null) {
      dispatch(deselectObject(selectedObjectId));
    }

    if (
      // Block draw with mouse wheel press
      viewOnly ||
      e.evt.button === 1 ||
      selectedTool === "none" ||
      // Don't draw when scaling with anchor
      isButtonOrAnchor(e) ||
      outOfBounds({
        position,
        endX: dimensions.width,
        endY: dimensions.height,
      })
    ) {
      return;
    }

    dispatch(updateHistory());
    dispatch(setIsDrawing(true));

    const id = `${new Date().valueOf()}`;

    const sharedValues = {
      id,
      type: selectedTool,
      color: selectedColor,
      points: [position.x, position.y, position.x, position.y],
      strokeWidth: strokeWidth,
      originalSize: dimensions,
    };

    switch (selectedTool) {
      case "freeHand":
      case "freeHandArrow":
      case "line":
      case "arrow":
      case "doubleSidedArrow":
      case "focusArrow":
        setNewObject({
          ...sharedValues,
        });
        break;
      case "angle":
        setNewObject({
          ...sharedValues,
          secondaryPoints: [position.x, position.y, position.x, position.y],
        });
        break;
      case "circle":
        setNewObject({
          ...sharedValues,
          radius: 0,
          width: 0,
          height: 0,
        });
        break;
      case "comment":
        dispatch(selectTool("none"));
        setNewObject({
          ...sharedValues,
          text: "",
        });
        break;
    }
  }

  function handleMove(e) {
    e.evt.preventDefault();
    if (!isDrawing || selectedTool === "none") return;

    const position = getRelativePointerPosition(stageRef);
    if (
      outOfBounds({
        position,
        endX: dimensions.width,
        endY: dimensions.height,
      })
    ) {
      return;
    }

    switch (selectedTool) {
      case "freeHand":
      case "freeHandArrow":
        updateFreeHand({
          updateObject: (object) => setNewObject(object),
          freeHand: newObject,
          position,
        });
        break;
      case "line":
      case "arrow":
      case "doubleSidedArrow":
      case "focusArrow":
        updateLine({
          updateObject: (object) => setNewObject(object),
          line: newObject,
          position,
          selectedColor,
        });
        break;
      case "angle":
        updateAngle({
          updateObject: (object) => setNewObject(object),
          angleObject: newObject,
          position,
          selectedColor,
        });
        break;
      case "circle":
        updateCircle({
          updateObject: (object) => setNewObject(object),
          circle: newObject,
          position,
          selectedColor,
        });
        break;
    }
  }

  function handleEnd() {
    if (!isDrawing) return;
    dispatch(setIsDrawing(false));

    if (!objects) return;

    if (notLongEnoughToDraw(newObject)) {
      setNewObject({});
      dispatch(undo());
      return;
    }

    if (selectedTool === "freeHand" || selectedTool === "freeHandArrow") {
      dispatch(
        updateWithObject(
          smoothLine({
            line: newObject,
            step: 6,
          })
        )
      );
    } else dispatch(updateWithObject(newObject));
  }

  function handleSelect(object) {
    if (object.type !== "disabled") {
      dispatch(selectColor(object.color));
      dispatch(setStrokeWidth(object.strokeWidth));
    }
    dispatch(selectObject(object.id));
  }

  return (
    <StyledCanvas ref={canvasRef} id="canvas">
      {!isLoading && objects && dimensions.width > 0 && (
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onWheel={(e) => {
            handleWheel(e);
          }}
          onMouseDown={(e) => {
            if (e.evt.button === 0) handleStart(e);
          }}
          onMousemove={handleMove}
          onMouseup={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={(e) => {
            if (e.evt.touches.length === 2) {
              handleMultiTouchMove(e);
            } else handleMove(e);
          }}
          onTouchEnd={(e) => {
            handleMultiTouchEnd();
            handleEnd(e);
          }}
        >
          <Layer listening={false}>
            <PoseImage dimensions={dimensions} setImageSize={setImageSize} />
            <CommentArea
              stageRef={stageRef}
              startX={dimensions.width / 2 - imageSize.width / 2}
              startY={dimensions.height / 2 + imageSize.height / 2}
              maxWidth={imageSize.width}
            />
          </Layer>
          <Layer>
            {[...Object.values(adjustedObjects), newObject].map((object) => {
              if (!object.points || notLongEnoughToDraw(object)) return null;

              const sharedProps = {
                object,
                isDraggable: !viewOnly && selectedObjectId === object.id,
                isSelected: !viewOnly && selectedObjectId === object.id,
                onSelect: () => handleSelect(object),
                stageRef: stageRef,
              };

              switch (object.type) {
                case "freeHand":
                  return <FreeHand key={object.id} {...sharedProps} />;
                case "freeHandArrow":
                  return <FreeHandArrow key={object.id} {...sharedProps} />;
                case "line":
                  return <Line key={object.id} {...sharedProps} />;
                case "arrow":
                  return <Arrow key={object.id} {...sharedProps} />;
                case "doubleSidedArrow":
                  return (
                    <Arrow
                      key={object.id}
                      doubleSided={true}
                      {...sharedProps}
                    />
                  );
                case "circle":
                  return <Circle key={object.id} {...sharedProps} />;
                case "angle":
                  return <Angle key={object.id} {...sharedProps} />;
                case "focusArrow":
                  return <FocusArrow key={object.id} {...sharedProps} />;
                default:
                  return null;
              }
            })}
          </Layer>
          <Layer>
            {[...Object.values(adjustedObjects), newObject].map((object) => {
              if (object.type === "comment") {
                return (
                  <Comment
                    key={object.id}
                    object={object}
                    isDraggable={!viewOnly && selectedObjectId === object.id}
                    isSelected={selectedObjectId === object.id}
                    onSelect={() => handleSelect(object)}
                    viewOnly={viewOnly}
                  />
                );
              } else {
                return null;
              }
            })}
          </Layer>
        </Stage>
      )}
    </StyledCanvas>
  );
}

export default Canvas;
