import { Line } from "react-konva";

function FreeHand({ line, isDraggable, onDragEnd }) {
  return (
    <Line
      points={line.points}
      stroke={line.color}
      strokeWidth={line.strokeWidth}
      tension={0.7}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={"source-over"}
      draggable={isDraggable}
      onDragEnd={onDragEnd}
    />
  );
}

export default FreeHand;
