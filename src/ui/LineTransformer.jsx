import { useEffect, useRef, useState } from "react";
import { Circle, Group } from "react-konva";

function LineTransformer({
  children,
  show,
  line,
  isDraggable,
  onTransformEnd,
  onDragEnd,
}) {
  const groupRef = useRef();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  function handleAnchorDragMove() {
    const newPoints = [
      groupRef.current.children[1].x(),
      groupRef.current.children[1].y(),
      groupRef.current.children[2].x(),
      groupRef.current.children[2].y(),
    ];

    setPoints(newPoints);

    // updating directly nodes makes the movement more smooth compared to states
    groupRef.current.children[0].points(newPoints);
  }

  function handleAnchorDragEnd() {
    onTransformEnd(points);
  }

  // Update line when group is dragged
  function handleGroupDragEnd() {
    const [x1, y1, x2, y2] = points;
    const { x: xOffset, y: yOffset } =
      groupRef.current.children[0].getAbsolutePosition();

    const newPoints = [x1 + xOffset, y1 + yOffset, x2 + xOffset, y2 + yOffset];
    onDragEnd(newPoints);
    setPoints(newPoints);

    // Reset group origin position
    groupRef.current.x(0);
    groupRef.current.y(0);
  }

  return (
    <Group
      ref={groupRef}
      draggable={isDraggable}
      onDragEnd={(e) => handleGroupDragEnd(e)}
    >
      {children}

      {show && (
        <>
          <Circle
            x={points[0]}
            y={points[1]}
            radius={12}
            fill="white"
            strokeWidth={2} // border width
            stroke="grey" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
          />

          <Circle
            x={points[2]}
            y={points[3]}
            radius={12}
            fill="white"
            strokeWidth={2} // border width
            stroke="grey" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
          />
        </>
      )}
    </Group>
  );
}

export default LineTransformer;
