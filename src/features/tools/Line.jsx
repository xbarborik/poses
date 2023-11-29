import { useEffect, useRef } from "react";
import { Line as LineKonva, Stage, Layer, Circle, Group } from "react-konva";
import LineTransformer from "../../ui/LineTransformer";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Line({ line, isDraggable, onDragEnd, isSelected, onSelect }) {
  return (
    <LineTransformer show={isSelected} line={line} isDraggable={isDraggable}>
      <LineKonva
        id={line.id}
        onClick={onSelect}
        onTap={onSelect}
        points={line.points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        onDragEnd={onDragEnd}
      />
    </LineTransformer>
  );
}

export default Line;
