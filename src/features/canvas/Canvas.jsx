import styled from "styled-components";
import { Stage, Layer, FastLayer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectObject,
  getIsDrawing,
  getObjects,
  getOriginalSize,
  getSelectedObjectId,
  redo,
  removeInvalidObject,
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
  setShowStyling,
  setStrokeWidth,
} from "../stylePanel/styleSlice";
import { getSelectedTool, selectTool } from "../toolbar/toolbarSlice";
import { useEffect, useRef, useState } from "react";
import {
  smoothLine,
  outOfBounds,
  notLongEnoughToDraw,
  getRelativePointerPosition,
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
import { getColor } from "../stylePanel/styleSlice";
import useCtrlAndKeyDown from "../../hooks/useCtrlAndKeyDown";
import { useMultiTouchScale } from "./useMultiTouchZoom";
import { useWheelAndTouchpadZoom } from "./useWheelAndTouchpadZoom";
import FreeHandArrow from "../tools/FreeHandArrow";
import Angle from "../tools/Angle";
import { updateAngle } from "../tools/angleUtils";
import Comment from "../tools/Comment";

const StyledCanvas = styled.div`
  display: flex;
  outline: 2px solid orange;
  outline-offset: -1px;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overscroll-behavior: none;
  background-color: #ffffffd9;
  zoom: 1;
  // justify-content: center;
`;

function Canvas({ stageRef, setImageSize, isLoading }) {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const objects = useSelector(getObjects);
  const isDrawing = useSelector(getIsDrawing);
  const strokeWidth = useSelector(getStrokeWidth);
  const selectedColor = useSelector(getColor);
  const selectedTool = useSelector(getSelectedTool);
  const selectedObjectId = useSelector(getSelectedObjectId);
  const originalSize = useSelector(getOriginalSize);

  const [newObjectId, setNewObjectId] = useState("");
  const [dimensions] = useDimensions(canvasRef);
  const [adjustedObjects, setAdjustedObjects] = useState({});

  const {
    scale: scaleAfterMultitouch,
    handleMultiTouchMove,
    handleMultiTouchEnd,
    pos: posAfterMultitouch,
  } = useMultiTouchScale(stageRef, dimensions);

  const {
    scale: scaleAfterWheel,
    handleWheel,
    pos: posAfterWheel,
  } = useWheelAndTouchpadZoom(stageRef);

  const outsideClickException = "adjust";
  useClickOutsideContainer(
    canvasRef,
    () => dispatch(deselectObject()),
    outsideClickException
  );
  useCtrlAndKeyDown("z", () => dispatch(undo()));
  useCtrlAndKeyDown("y", () => dispatch(redo()));

  useEffect(() => {
    const withAdjustedPoints = convertRelativeToAbsolute(objects, dimensions);
    setAdjustedObjects(withAdjustedPoints);
  }, [objects, dimensions]);

  useEffect(() => {
    dispatch(setStagePos(posAfterWheel));
    dispatch(setStageScale(scaleAfterWheel));
  }, [scaleAfterWheel, dispatch, posAfterWheel]);

  useEffect(() => {
    dispatch(setStagePos(posAfterMultitouch));
    dispatch(setStageScale(scaleAfterMultitouch));
  }, [scaleAfterMultitouch, dispatch, posAfterMultitouch]);

  // Reset scale
  useEffect(() => {
    const stage = stageRef.current;
    if (stage != null) {
      dispatch(setStageScale(1));
      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
    }
  }, [dispatch, stageRef]);

  //https://konvajs.org/docs/react/Transformer.html
  function checkDeselect(e) {
    if (selectedObjectId === null) return;
    if (e.target === e.target.getStage()) {
      dispatch(deselectObject());
    }
  }

  function isButtonOrAnchor(e) {
    const name = e?.target?.attrs?.name;
    return name?.includes("anchor") || name?.includes("removeButton");
  }

  function handleStart(e) {
    e.evt.preventDefault();

    const position = getRelativePointerPosition(e);

    if (
      // Block draw with mouse wheel press
      e.evt.button === 1 ||
      selectedTool === "none" ||
      // Don't draw when scaling with anchor or clicking button
      isButtonOrAnchor(e) ||
      outOfBounds({
        position,
        endX: dimensions.width,
        endY: dimensions.height,
      })
    ) {
      return;
    }

    const clickedObjectId = e.target.id();

    if (clickedObjectId === selectedObjectId) {
      return;
    } else if (selectedObjectId != null) {
      dispatch(deselectObject(selectedObjectId));
    }

    dispatch(updateHistory());
    dispatch(setIsDrawing(true));
    dispatch(setShowStyling(false));

    const id = String(new Date().valueOf());
    setNewObjectId(id);

    if (selectedTool === "comment") {
      dispatch(selectObject(id));
    }

    switch (selectedTool) {
      case "freeHand":
      case "freeHandArrow":
      case "line":
      case "arrow":
        dispatch(
          updateWithObject({
            id,
            color: selectedColor,
            type: selectedTool,
            points: [position.x, position.y, position.x, position.y],
            strokeWidth: strokeWidth,
          })
        );
        break;
      case "angle":
        dispatch(
          updateWithObject({
            id,
            color: selectedColor,
            type: selectedTool,
            points: [position.x, position.y, position.x, position.y],
            secondaryPoints: [position.x, position.y, position.x, position.y],
            strokeWidth: strokeWidth,
          })
        );
        break;
      case "circle":
        dispatch(
          updateWithObject({
            id,
            color: selectedColor,
            type: selectedTool,
            points: [position.x, position.y, position.x, position.y],
            strokeWidth: strokeWidth,
            radius: 0,
            width: 0,
            height: 0,
          })
        );
        break;
      case "comment":
        dispatch(selectTool("none"));
        dispatch(
          updateWithObject({
            id,
            type: selectedTool,
            text: "",
            color: selectedColor,
            points: [position.x, position.y, position.x, position.y],
          })
        );
        break;
    }
  }

  function handleMove(e) {
    e.evt.preventDefault();
    if (!isDrawing || selectedTool === "none") return;

    if (selectedObjectId != null) dispatch(deselectObject());

    const position = getRelativePointerPosition(e);
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
          updateWithObject: (object) => dispatch(updateWithObject(object)),
          freeHand: objects[newObjectId],
          position,
        });
        break;
      case "line":
      case "arrow":
        updateLine({
          updateWithObject: (object) => dispatch(updateWithObject(object)),
          line: objects[newObjectId],
          position,
          selectedColor,
        });
        break;
      case "angle":
        updateAngle({
          updateWithObject: (object) => dispatch(updateWithObject(object)),
          angleObject: objects[newObjectId],
          position,
          selectedColor,
        });
        break;
      case "circle":
        updateCircle({
          updateWithObject: (object) => dispatch(updateWithObject(object)),
          circle: objects[newObjectId],
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

    if (notLongEnoughToDraw(objects[newObjectId])) {
      dispatch(removeInvalidObject(newObjectId));
      return;
    }

    dispatch(selectObject(newObjectId));

    if (selectedTool === "freeHand" || selectedTool === "freeHandArrow") {
      smoothLine({
        objects,
        updateWithObject: (object) => dispatch(updateWithObject(object)),
        id: newObjectId,
        step: 2,
      });
    }
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
      {!isLoading &&
        objects &&
        dimensions.width > 0 &&
        originalSize !== null && (
          <Stage
            ref={stageRef}
            width={dimensions.width}
            height={dimensions.height}
            onWheel={(e) => {
              handleWheel(e);
              dispatch(deselectObject());
            }}
            onMouseDown={(e) => {
              if (e.evt.button === 0) handleStart(e);
            }}
            onMousemove={handleMove}
            onMouseup={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={(e) => {
              if (e.evt.touches.length === 2) {
                dispatch(deselectObject());
                handleMultiTouchMove(e);
              } else handleMove(e);
            }}
            onTouchEnd={(e) => {
              handleMultiTouchEnd();
              handleEnd(e);
            }}
            onClick={checkDeselect}
            onTap={checkDeselect}
          >
            <FastLayer>
              <PoseImage dimensions={dimensions} setImageSize={setImageSize} />
            </FastLayer>
            <Layer>
              {Object.values(adjustedObjects).map((object) => {
                if (notLongEnoughToDraw(object, strokeWidth)) return null;
                if (object.type === "freeHand") {
                  return (
                    <FreeHand
                      key={object.id}
                      line={object}
                      isDraggable={selectedObjectId === object.id}
                      isSelected={selectedObjectId === object.id}
                      onSelect={() => handleSelect(object)}
                      stageRef={stageRef}
                    />
                  );
                } else if (object.type === "freeHandArrow") {
                  return (
                    <FreeHandArrow
                      key={object.id}
                      line={object}
                      isDraggable={selectedObjectId === object.id}
                      isSelected={selectedObjectId === object.id}
                      onSelect={() => handleSelect(object)}
                      stageRef={stageRef}
                    />
                  );
                } else if (object.type === "line") {
                  return (
                    <Line
                      key={object.id}
                      line={object}
                      isDraggable={selectedObjectId === object.id}
                      isSelected={selectedObjectId === object.id}
                      onSelect={() => handleSelect(object)}
                    />
                  );
                } else if (object.type === "arrow") {
                  return (
                    <Arrow
                      key={object.id}
                      arrow={object}
                      isDraggable={selectedObjectId === object.id}
                      isSelected={selectedObjectId === object.id}
                      onSelect={() => handleSelect(object)}
                    />
                  );
                } else if (object.type === "circle") {
                  return (
                    <Circle
                      key={object.id}
                      circle={object}
                      isDraggable={selectedObjectId === object.id}
                      isSelected={selectedObjectId === object.id}
                      onSelect={() => handleSelect(object)}
                      stageRef={stageRef}
                    />
                  );
                } else if (object.type === "angle") {
                  return (
                    <Angle
                      key={object.id}
                      angleObject={object}
                      isDraggable={selectedObjectId === object.id}
                      isSelected={selectedObjectId === object.id}
                      onSelect={() => handleSelect(object)}
                    />
                  );
                } else {
                  return null;
                }
              })}
            </Layer>
            <Layer>
              {Object.values(adjustedObjects).map((object) => {
                if (object.type === "comment") {
                  return (
                    <>
                      <Comment
                        key={object.id}
                        comment={object}
                        isDraggable={selectedObjectId === object.id}
                        isSelected={selectedObjectId === object.id}
                        onSelect={() => handleSelect(object)}
                      />
                      {/* <CommentContent
                        key={"content" + object.id}
                        comment={{
                          ...object,
                          points: [200, dimensions.height + 200],
                        }}
                        isDraggable={selectedObjectId === object.id}
                        isSelected={selectedObjectId === object.id}
                        onSelect={() => handleSelect(object)}
                      /> */}
                    </>
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
