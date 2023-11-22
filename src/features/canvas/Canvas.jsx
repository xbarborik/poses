import styled from "styled-components";
import { Stage, Layer } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectObject,
  getColor,
  getIsDrawing,
  getSelectedObject,
  selectObject,
  setIsDrawing,
} from "./canvasSlice";
import { getStrokeWidth } from "../stroke-width-slider/sliderSlice";
import { getSelectedTool } from "../tools/toolbarSlice";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { smoothLine, outOfBounds } from "../../utils/helpers";
import FreeHand from "../tools/FreeHand";
import { updateFreeHand } from "../tools/freeHandUtils";
import Arrow from "../tools/Arrow";
import Line from "../tools/line";
import Circle from "../tools/Circle";
import { updateLine } from "../tools/lineUtils";
import PoseImage from "./PoseImage";
import CircleRotator from "../customShapes/circleRotator";
import { updateCircle } from "../tools/circleUtils";
import { useDimensions } from "./useDimensions";

/* TODO
ondragend update coords


*/

const StyledCanvas = styled.div`
  display: block;

  outline: 2px solid orange;
  outline-offset: -1px;
  flex-grow: 1;
  position: relative;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
`;

function Canvas() {
  const [objects, setObjects] = useState({});
  const [newObjectId, setNewObjectId] = useState("");
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  const isDrawing = useSelector(getIsDrawing);
  const strokeWidth = useSelector(getStrokeWidth);
  const selectedColor = useSelector(getColor);
  const selectedTool = useSelector(getSelectedTool);
  const selectedObject = useSelector(getSelectedObject);
  const isDraggable = selectedTool == "none";
  const dimensions = useDimensions(canvasRef);

  //https://konvajs.org/docs/react/Transformer.html
  function checkDeselect(e, selectedObjectId) {
    // Deselect when clicked on empty area.
    // if (e.target.id !== selectedObjectId) { triggers even on transformer
    //   dispatch(deselectObject());
    // }
  }

  function handleStart(e) {
    if (selectedTool === "none") return;

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

    dispatch(setIsDrawing(true));

    const id = String(new Date().valueOf());
    setNewObjectId(id);
    switch (selectedTool) {
      case "freeHand":
      case "line":
      case "arrow":
        setObjects({
          ...objects,
          [id]: {
            id,
            color: selectedColor,
            type: selectedTool,
            points: [position.x, position.y],
            strokeWidth: strokeWidth,
          },
        });
        break;
      case "circle":
        setObjects({
          ...objects,
          [id]: {
            id,
            color: selectedColor,
            type: selectedTool,
            points: [position.x, position.y],
            width: 0,
            height: 0,
            radius: 0,
          },
        });
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
          objects,
          setObjects,
          freeHand: objects[newObjectId],
          position,
          selectedColor,
        });
        break;
      case "line":
      case "arrow":
        updateLine({
          objects,
          setObjects,
          line: objects[newObjectId],
          position,
          selectedColor,
        });
        break;
      case "circle":
        updateCircle({
          objects,
          setObjects,
          circle: objects[newObjectId],
          position,
          selectedColor,
        });
        break;
    }
  }

  function handleEnd() {
    dispatch(setIsDrawing(false));
    if (objects.length === 0) return;

    if (selectedTool === "freeHand")
      smoothLine({ objects, setObjects, id: newObjectId, step: 4 });
    console.log(objects);
  }

  return (
    <StyledCanvas ref={canvasRef} id="canvas">
      <Stage
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={(e) => {
          checkDeselect(e, objects[selectedObject.id]);
          handleStart(e);
        }}
        onMousemove={handleMove}
        onMouseup={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
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
                />
              );
            } else if (object.type === "line") {
              return (
                <Line key={object.id} line={object} isDraggable={isDraggable} />
              );
            } else if (object.type === "arrow") {
              return (
                <Arrow
                  key={object.id}
                  arrow={object}
                  isDraggable={isDraggable}
                />
              );
            } else if (object.type === "circle") {
              return (
                <Circle
                  key={object.id}
                  circle={object}
                  isDraggable={isDraggable}
                  isSelected={selectedObject.id === object.id}
                  onSelect={() => dispatch(selectObject(object))}
                  onChange={(newCircle) => {
                    setObjects({ ...objects, [object.id]: newCircle });
                  }}
                />
              );
            }
            return null; // return null for objects with unsupported types
          })}
          {/* <CircleRotator x={500} y={600} arrowLength={40} /> */}
        </Layer>
      </Stage>
    </StyledCanvas>
  );
}

export default Canvas;
