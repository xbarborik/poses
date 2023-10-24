import { Line } from "react-konva";

function FreeHand({ line, isDraggable }) {
  return (
    <Line
      points={line.points}
      stroke={line.color}
      strokeWidth={5}
      tension={0.7}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={"source-over"}
      draggable={isDraggable}
    />
  );
}

export default FreeHand;
