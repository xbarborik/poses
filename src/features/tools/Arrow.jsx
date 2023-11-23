import { Arrow as ArrowKonva } from "react-konva";

function Arrow({ arrow, isDraggable, onDragEnd }) {
  return (
    <ArrowKonva
      points={arrow.points}
      stroke={arrow.color}
      strokeWidth={arrow.strokeWidth}
      fill={arrow.color}
      tension={0.7}
      globalCompositeOperation={"source-over"}
      draggable={isDraggable}
      pointerLength={20}
      pointerWidth={20}
      onDragEnd={onDragEnd}
    />
  );
}

export default Arrow;
