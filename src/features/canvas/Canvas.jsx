import styled from "styled-components";
import { Stage, Layer, Line } from "react-konva";
import { useSelector } from "react-redux";
import { getColor } from "./canvasSlice";
import { useRef, useState } from "react";
import Palette from "../colors/palette";

const dimensions = { width: 1000, height: 720 };

const StyledCanvas = styled.div`
  border: 5px solid black;
  width: 1000px;
  height: 720px;
  background-color: white;
`;

function Canvas() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [lines, setLines] = useState([]);
  const canvasRef = useRef(null);
  const color = useSelector(getColor);

  function handlePenStart(e) {
    setIsDrawing(true);

    const position = e.target.getStage().getPointerPosition();
    if (
      position.x <= 1 ||
      position.x >= dimensions.width ||
      position.y <= 1 ||
      position.y >= dimensions.height
    ) {
      return;
    }
    setLines([...lines, { points: [position.x, position.y] }]);
  }

  function handlePenMove(e) {
    if (!isDrawing) return;

    const position = e.target.getStage().getPointerPosition();
    if (
      position.x <= 1 ||
      position.x >= dimensions.width ||
      position.y <= 1 ||
      position.y >= dimensions.height
    ) {
      return;
    }

    let currentLine = lines.at(-1);

    currentLine.points = currentLine.points.concat([position.x, position.y]);
    currentLine.color = color;

    lines.splice(lines.length - 1, 1, currentLine);

    setLines(lines.concat());
  }

  function handlePenEnd() {
    setIsDrawing(false);
  }

  return (
    <>
      <Palette />
      <StyledCanvas ref={canvasRef}>
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onMouseDown={handlePenStart}
          onMousemove={handlePenMove}
          onMouseup={handlePenEnd}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={5}
                tension={0.7}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={"source-over"}
              />
            ))}
          </Layer>
        </Stage>
      </StyledCanvas>
    </>
  );
}

export default Canvas;
