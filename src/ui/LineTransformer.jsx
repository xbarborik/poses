import { useEffect, useRef } from "react";
import { Circle, Group, Line } from "react-konva";

function LineTransformer({
  children,
  show,
  points,
  setPoints,
  isDraggable,
  onTransformEnd,
  onDragEnd,
  onRemove,
}) {
  const groupRef = useRef();

  // Use latter for simpler transformer
  const removeButtonPoint = findEquidistantPoint(points, 40) || {
    x: points[0],
    y: points[1],
  };

  useEffect(() => {
    groupRef.current.moveToTop();
  }, []);

  // https://stackoverflow.com/questions/133897/how-do-you-find-a-point-at-a-given-perpendicular-distance-from-a-line
  function findEquidistantPoint(points, distance) {
    // Find the midpoint
    const midX = (points[0] + points[2]) / 2;
    const midY = (points[1] + points[3]) / 2;

    // Determine the direction perpendicular to the line
    const dx = points[2] - points[0];
    const dy = points[3] - points[1];
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return { x: points[0], y: points[1] };

    const directionX = dx / length;
    const directionY = dy / length;

    //  Move a distance along the perpendicular direction
    const equidistantX = midX + distance * directionY;
    const equidistantY = midY - distance * directionX;

    return { x: equidistantX, y: equidistantY };
  }

  function handleAnchorDragMove() {
    const newPoints = [
      groupRef.current.children[1].x(),
      groupRef.current.children[1].y(),
      groupRef.current.children[2].x(),
      groupRef.current.children[2].y(),
    ];

    setPoints(newPoints);
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
    setPoints(newPoints);
    onDragEnd(newPoints);

    // Reset group origin position
    groupRef.current.position({ x: 0, y: 0 });
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
          {/* Anchors */}
          <Circle
            name="anchor"
            x={points[0]}
            y={points[1]}
            radius={12}
            fill="white"
            strokeWidth={2} // border width
            stroke="#33ABF9" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
          />

          <Circle
            name="anchor"
            x={points[2]}
            y={points[3]}
            radius={12}
            fill="white"
            strokeWidth={2} // border width
            stroke="#33ABF9" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
          />

          {/* Remove Button */}
          <Group>
            <Circle
              name="removeButton"
              x={removeButtonPoint.x}
              y={removeButtonPoint.y}
              // strokeWidth={1} // border width
              // stroke="white" // border color
              radius={16}
              fill="red"
              onClick={onRemove}
              onTap={onRemove}
            />

            <Line
              points={[
                removeButtonPoint.x - 8,
                removeButtonPoint.y - 8,
                removeButtonPoint.x + 8,
                removeButtonPoint.y + 8,
              ]}
              stroke="white"
              strokeWidth={3}
              listening={false}
            />

            <Line
              points={[
                removeButtonPoint.x - 8,
                removeButtonPoint.y + 8,
                removeButtonPoint.x + 8,
                removeButtonPoint.y - 8,
              ]}
              stroke="white"
              strokeWidth={3}
              listening={false}
            />
          </Group>
        </>
      )}
    </Group>
  );
}

export default LineTransformer;
