import { Line as LineKonva } from "react-konva";

function Line({ line, isDraggable }) {
  return (
    <LineKonva
      points={line.points}
      stroke={line.color}
      strokeWidth={line.strokeWidth}
      tension={0.7}
      globalCompositeOperation={"source-over"}
      draggable={isDraggable}
    />
  );
}

export default Line;
