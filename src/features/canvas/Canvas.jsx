import styled from "styled-components";
import { Stage, Layer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectObject,
  getIsDrawing,
  getIsLoading,
  getObjects,
  getSelectedObjectId,
  getStageScale,
  redo,
  removeInvalidObject,
  selectObject,
  setIsDrawing,
  setStageScale,
  undo,
  updateHistory,
  updateWithObject,
} from "./canvasSlice";
import { getStrokeWidth } from "../stroke-width-slider/sliderSlice";
import { getSelectedTool } from "../tools/toolbarSlice";
import { useRef, useState } from "react";
import {
  smoothLine,
  outOfBounds,
  notLongEnoughToDraw,
  getRelativePointerPosition,
} from "../../utils/helpers";
import FreeHand from "../tools/FreeHand";
import { updateFreeHand } from "../tools/freeHandUtils";
import Arrow from "../tools/Arrow";
import Line from "../tools/line";
import { updateLine } from "../tools/lineUtils";
import PoseImage from "./PoseImage";
// import CircleRotator from "../customShapes/circleRotator";
import { updateCircle } from "../tools/circleUtils";
import { useDimensions } from "./useDimensions";
import useClickOutsideContainer from "../../hooks/useClickOutsideContainer";

import Circle from "../tools/CircleFromCorner";
import { getColor } from "../colors/colorSlice";
import useCtrlAndKeyDown from "../../hooks/useCtrlAndKeyDown";

import { Circle as CircleKonva } from "react-konva"; // TODO delete

const StyledCanvas = styled.div`
  display: block;

  outline: 2px solid orange;
  outline-offset: -1px;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overscroll-behavior: none;
  background-color: #ffffffca;
  zoom: 1;
`;

function Canvas() {
  const canvasRef = useRef(null);
  const stageRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const objects = useSelector(getObjects);
  const isDrawing = useSelector(getIsDrawing);
  const strokeWidth = useSelector(getStrokeWidth);
  const selectedColor = useSelector(getColor);
  const selectedTool = useSelector(getSelectedTool);
  const selectedObjectId = useSelector(getSelectedObjectId);

  const [newObjectId, setNewObjectId] = useState("");
  const [dimensions, setDimensions] = useDimensions(canvasRef);

  const stageScale = useSelector(getStageScale);

  const outsideClickException = "adjust";
  useClickOutsideContainer(
    canvasRef,
    () => dispatch(deselectObject()),
    outsideClickException
  );
  useCtrlAndKeyDown("z", () => dispatch(undo()));
  useCtrlAndKeyDown("y", () => dispatch(redo()));

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
    e.preventDefault();

    const position = getRelativePointerPosition(e);

    if (
      // Block draw with mouse wheel press
      e.evt.button === 1 ||
      selectedTool === "none" ||
      // Don't draw when scaling
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

    const id = String(new Date().valueOf());
    setNewObjectId(id);

    switch (selectedTool) {
      case "freeHand":
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
      dispatch(removeInvalidObject(newObjectId)); // todo make custom action for deleting object and restoring previous history state
      return;
    }

    if (selectedTool === "freeHand") {
      smoothLine({
        objects,
        updateWithObject: (object) => dispatch(updateWithObject(object)),
        id: newObjectId,
        step: 4,
      });
    }
  }

  function handleSelect(objectId) {
    dispatch(selectObject(objectId));
  }

  // https://konvajs.org/docs/sandbox/Zooming_Relative_To_Pointer.html#sidebar
  function handleWheel(e) {
    const stage = stageRef.current;
    const scaleBy = 1.1;

    e.evt.preventDefault();

    var oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let direction = e.evt.deltaY > 0 ? -1 : 1;

    // when we zoom on trackpad, e.evt.ctrlKey is true

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });
    dispatch(setStageScale(newScale));

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };
    stage.position(newPos);
  }

  return (
    <StyledCanvas ref={canvasRef} id="canvas">
      {!isLoading && objects && (
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onWheel={handleWheel}
          onMouseDown={(e) => {
            handleStart(e);
          }}
          onMousemove={(e) => handleMove(e)}
          onMouseup={(e) => handleEnd(e)}
          onTouchStart={(e) => {
            handleStart(e);
          }}
          onTouchMove={(e) => handleMove(e)}
          onTouchEnd={(e) => handleEnd(e)}
          onClick={(e) => checkDeselect(e)}
          onTap={(e) => checkDeselect(e)}
          draggable={selectedTool === "none"}
        >
          <Layer>
            <PoseImage dimensions={dimensions} />
            {Object.values(objects).map((object) => {
              if (notLongEnoughToDraw(object)) return null;
              if (object.type === "freeHand") {
                return (
                  <FreeHand
                    key={object.id}
                    line={object}
                    isDraggable={selectedObjectId === object.id}
                    isSelected={selectedObjectId === object.id}
                    onSelect={() => handleSelect(object.id)}
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
                    onSelect={() => handleSelect(object.id)}
                    stageRef={stageRef}
                  />
                );
              } else if (object.type === "arrow") {
                return (
                  <Arrow
                    key={object.id}
                    arrow={object}
                    isDraggable={selectedObjectId === object.id}
                    isSelected={selectedObjectId === object.id}
                    onSelect={() => handleSelect(object.id)}
                    stageRef={stageRef}
                  />
                );
              } else if (object.type === "circle") {
                return (
                  <Circle
                    key={object.id}
                    circle={object}
                    isDraggable={selectedObjectId === object.id}
                    isSelected={selectedObjectId === object.id}
                    onSelect={() => handleSelect(object.id)}
                    stageRef={stageRef}
                  />
                );
              }
              return null;
            })}
            {/* <CircleRotator x={500} y={600} arrowLength={40} /> */}
          </Layer>
        </Stage>
      )}
    </StyledCanvas>
  );
}

export default Canvas;
