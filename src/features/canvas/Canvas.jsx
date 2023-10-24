import styled from "styled-components";
import { Stage, Layer, Shape } from "react-konva";
import { useSelector } from "react-redux";
import { getColor } from "./canvasSlice";
import { getSelectedTool } from "../tools/toolbarSlice";
import { useRef, useState } from "react";
import Palette from "../colors/palette";
import { filterLastLine, outOfBounds } from "../../helpers";
import FreeHand from "../tools/FreeHand";
import { updateFreeHand } from "../tools/freeHandUtils";
import Arrow from "../tools/Arrow";
import Line from "../tools/line";
import { updateLine } from "../tools/lineUtils";
import PoseImage from "./PoseImage";

const dimensions = { width: 1000, height: 720 };

const StyledCanvas = styled.div`
  border: 5px solid black;
  width: 1000px;
  height: 720px;
  background-color: white;
`;

function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [objects, setObjects] = useState([]);
  const canvasRef = useRef(null);
  const color = useSelector(getColor);
  const tool = useSelector(getSelectedTool);
  const isDraggable = tool === "grab";

  function handleStart(e) {
    if (tool === "grab") return;

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

    setIsDrawing(true);
    const id = new Date().valueOf();

    setObjects([
      ...objects,
      { id, color, type: tool, points: [position.x, position.y] },
    ]);
  }

  function handleMove(e) {
    if (!isDrawing || tool === "grab") return;

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

    if (tool === "freeHand")
      updateFreeHand({
        objects,
        setObjects,
        freeHand: objects.at(-1),
        position,
        color,
      });
    else if (tool === "line" || tool === "arrow")
      updateLine({
        objects,
        setObjects,
        line: objects.at(-1),
        position,
        color,
      });
  }

  function handleEnd() {
    setIsDrawing(false);
    if (objects.length === 0) return;

    if (tool === "freeHand") filterLastLine({ objects, setObjects, step: 16 });
    console.log(objects);
  }

  return (
    <>
      <Palette />
      <StyledCanvas ref={canvasRef}>
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handleStart}
          onMousemove={handleMove}
          onMouseup={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          <Layer>
            <PoseImage />
            {objects.map((object) => {
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
                  <Line
                    key={object.id}
                    line={object}
                    isDraggable={isDraggable}
                  />
                );
              } else if (object.type === "arrow") {
                return (
                  <Arrow
                    key={object.id}
                    arrow={object}
                    isDraggable={isDraggable}
                  />
                );
              }
              return null; // return null for objects with unsupported types
            })}
            <Shape
              sceneFunc={(context, shape) => {
                let x = 800;
                let y = 600;
                let radius = 25;
                let arrowLength = 40;
                let top = y - radius - arrowLength;
                let ratio = 3;
                context.beginPath();
                context.arc(x, y, radius, 0, 90);
                context.moveTo(x, y - radius);
                context.lineTo(x, top);
                context.moveTo(x - radius / ratio, top);
                context.lineTo(x + radius / ratio, top);
                context.lineTo(x, top - radius / ratio);
                context.closePath();
                context.fillStrokeShape(shape);
              }}
              stroke="red"
              strokeWidth={4}
              draggable
            />
          </Layer>
        </Stage>
      </StyledCanvas>
    </>
  );
}

export default Canvas;
