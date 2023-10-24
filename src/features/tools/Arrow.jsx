import { Arrow as ArrowKonva } from "react-konva";

function Arrow({ arrow, isDraggable }) {
  return (
    <ArrowKonva
      points={arrow.points}
      stroke={arrow.color}
      strokeWidth={5}
      fill={arrow.color}
      tension={0.7}
      globalCompositeOperation={"source-over"}
      draggable={isDraggable}
      pointerLength={20}
      pointerWidth={20}
    />
  );
}

export default Arrow;
