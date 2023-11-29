import { useRef } from "react";
import { Circle, Group } from "react-konva";

function LineTransformer({ children, show, line, isDraggable }) {
  const groupRef = useRef();

  function updateLine() {
    const points = [
      groupRef.current.children[1].x(),
      groupRef.current.children[1].y(),
      groupRef.current.children[2].x(),
      groupRef.current.children[2].y(),
    ];
    groupRef.current.children[0].points(points);
  }

  return (
    <Group ref={groupRef} draggable={isDraggable} onDragEnd={() => {}}>
      {children}
      {show && (
        <>
          <Circle
            x={line.points[0]}
            y={line.points[1]}
            radius={12}
            fill="blue"
            draggable
            onDragMove={updateLine}
          />

          <Circle
            x={line.points[2]}
            y={line.points[3]}
            radius={12}
            fill="blue"
            draggable
            onDragMove={updateLine}
          />
        </>
      )}
    </Group>
  );
}

export default LineTransformer;
