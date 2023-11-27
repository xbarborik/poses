import { useEffect, useRef } from "react";
import { Line as LineKonva, Stage, Layer, Circle, Group } from "react-konva";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Line({ line, isDraggable, onDragEnd, isSelected, onSelect }) {
  const groupRef = useRef();

  const updateLine = () => {
    const points = [
      groupRef.current.children[1].x(),
      groupRef.current.children[1].y(),
      groupRef.current.children[2].x(),
      groupRef.current.children[2].y(),
    ];
    groupRef.current.children[0].points(points);
  };

  return (
    <Group ref={groupRef} draggable={isDraggable} onDragEnd={() => {}}>
      <LineKonva
        id={line.id}
        onClick={onSelect}
        points={line.points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        onDragEnd={onDragEnd}
      />
      {isSelected && (
        <Circle
          x={line.points[0]}
          y={line.points[1]}
          radius={12}
          fill="red"
          draggable
          onDragMove={updateLine}
        />
      )}
      {isSelected && (
        <Circle
          x={line.points[2]}
          y={line.points[3]}
          radius={12}
          fill="red"
          draggable
          onDragMove={updateLine}
        />
      )}
    </Group>
  );
}

export default Line;
