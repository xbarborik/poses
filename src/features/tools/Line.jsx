import { Line as LineKonva } from "react-konva";

function Line({ line, isDraggable, onDragEnd }) {
  return (
    <LineKonva
      points={line.points}
      stroke={line.color}
      strokeWidth={line.strokeWidth}
      tension={0.7}
      lineCap="round"
      globalCompositeOperation={"source-over"}
      draggable={isDraggable}
      onDragEnd={onDragEnd}
    />
  );
}

export default Line;
