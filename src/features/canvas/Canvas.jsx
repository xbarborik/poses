import styled from "styled-components";
import { Stage, Layer, Transformer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectObject,
  getColor,
  getIsDrawing,
  getIsLoading,
  getObjects,
  getSelectedObjectId,
  removeObject,
  selectObject,
  setIsDrawing,
  updateHistory,
  updateWithObject,
} from "./canvasSlice";
import { getStrokeWidth } from "../stroke-width-slider/sliderSlice";
import { getSelectedTool } from "../tools/toolbarSlice";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { smoothLine, outOfBounds } from "../../utils/helpers";
import FreeHand from "../tools/FreeHand";
import { updateFreeHand } from "../tools/freeHandUtils";
import Arrow from "../tools/Arrow";
import Line from "../tools/line";
import { updateLine } from "../tools/lineUtils";
import PoseImage from "./PoseImage";
import CircleRotator from "../customShapes/circleRotator";
import { updateCircle } from "../tools/circleUtils";
import { useDimensions } from "./useDimensions";
import useClickOutsideContainer from "./useClickOutsideContainer";

import Circle from "../tools/CircleFromCorner";

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
`;

function Canvas() {
  const [newObjectId, setNewObjectId] = useState("");
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(getIsLoading);
  const objects = useSelector(getObjects);
  const isDrawing = useSelector(getIsDrawing);
  const strokeWidth = useSelector(getStrokeWidth);
  const selectedColor = useSelector(getColor);
  const selectedTool = useSelector(getSelectedTool);
  const selectedObjectId = useSelector(getSelectedObjectId);
  // const isDraggable = selectedTool == "none";
  const isDraggable = true;
  const dimensions = useDimensions(canvasRef);

  useClickOutsideContainer(canvasRef, () => dispatch(deselectObject()));

  //https://konvajs.org/docs/react/Transformer.html
  function checkDeselect(e) {
    if (selectedObjectId === null) return;

    if (e.target === e.target.getStage()) {
      dispatch(deselectObject());
    } else {
      dispatch(selectObject(e.target.id()));
    }
  }

  function isButtonOrAnchor(e) {
    const name = e?.target?.attrs?.name;
    return name?.includes("anchor") || name?.includes("removeButton");
  }

  function handleStart(e) {
    const position = e.target.getStage().getPointerPosition();

    if (
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

    if (clickedObjectId && objects[clickedObjectId]) {
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
    if (!isDrawing || selectedTool === "none") return;

    const position = e.target.getStage().getPointerPosition();
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

    if (selectedTool === "freeHand") {
      smoothLine({
        objects,
        updateWithObject: (object) => dispatch(updateWithObject(object)),
        id: newObjectId,
        step: 4,
      });
    } else if (objects[newObjectId].points.lenght < 10) {
      dispatch(removeObject(newObjectId));
    }
  }

  function handleSelect(e, objectId) {
    dispatch(selectObject(objectId));
  }

  return (
    <StyledCanvas ref={canvasRef} id="canvas">
      {!isLoading && objects && (
        <Stage
          width={dimensions.width}
          height={dimensions.height}
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
        >
          <Layer>
            <PoseImage dimensions={dimensions} />
            {Object.values(objects).map((object) => {
              if (object.type === "freeHand") {
                return (
                  <FreeHand
                    key={object.id}
                    line={object}
                    isDraggable={isDraggable}
                    isSelected={selectedObjectId === object.id}
                    onSelect={(e) => handleSelect(e, object.id)}
                  />
                );
              } else if (object.type === "line") {
                return (
                  <Line
                    key={object.id}
                    line={object}
                    isDraggable={isDraggable}
                    isSelected={selectedObjectId === object.id}
                    onSelect={(e) => handleSelect(e, object.id)}
                  />
                );
              } else if (object.type === "arrow") {
                return (
                  <Arrow
                    key={object.id}
                    arrow={object}
                    isDraggable={isDraggable}
                    isSelected={selectedObjectId === object.id}
                    onSelect={(e) => handleSelect(e, object.id)}
                  />
                );
              } else if (object.type === "circle") {
                return (
                  <Circle
                    key={object.id}
                    circle={object}
                    isDraggable={isDraggable}
                    isSelected={selectedObjectId === object.id}
                    onSelect={(e) => handleSelect(e, object.id)}
                    onChange={(newCircle) => {
                      dispatch(updateWithObject(newCircle));
                    }}
                  />
                );
              }
              return null; // return null for objects with unsupported types
            })}
            {/* <CircleRotator x={500} y={600} arrowLength={40} /> */}
          </Layer>
        </Stage>
      )}
    </StyledCanvas>
  );
}

export default Canvas;
