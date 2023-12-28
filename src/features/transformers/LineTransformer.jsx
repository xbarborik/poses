import { useEffect, useRef, useState } from "react";
import { Circle, Group, Line } from "react-konva";
import { useSelector } from "react-redux";
import { getStageScale } from "../canvas/canvasSlice";
import { circleHitFunc } from "../../hit_functions/circleHitFunction";

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
  const anchor1Ref = useRef();
  const anchor2Ref = useRef();
  const stageScale = useSelector(getStageScale);
  const [anchorOffset, setAnchorOffset] = useState({ x: 0, y: 0 });
  const [showAnchors, setShowAnchors] = useState(true);

  const anchorScale = stageScale / 0.9;
  const anchorSize = 16 / anchorScale;
  const anchorOffsetDistance = 40 / anchorScale; // distance from line object
  const removeButtonOffsetDistance = 40 / anchorScale;

  // Use latter for simpler transformer
  const removeButtonPoint = findEquidistantPoint(
    points,
    removeButtonOffsetDistance
  ) || {
    x: points[0],
    y: points[1],
  };

  useEffect(() => {
    groupRef.current.moveToTop();
  }, [show]);

  useEffect(() => {
    function findNewAnchorPoint() {
      const dx = points[2] - points[0];
      const dy = points[3] - points[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length === 0) return { x: points[0], y: points[1] };
      //console.log(length);

      const directionX = dx / length;
      const directionY = dy / length;

      const offsetX = directionX * anchorOffsetDistance;
      const offsetY = directionY * anchorOffsetDistance;

      setAnchorOffset({ x: offsetX, y: offsetY });
    }

    findNewAnchorPoint();
  }, [points, anchorOffsetDistance]);

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
      anchor1Ref.current.x() + anchorOffset.x,
      anchor1Ref.current.y() + anchorOffset.y,
      anchor2Ref.current.x() - anchorOffset.x,
      anchor2Ref.current.y() - anchorOffset.y,
    ];
    setPoints(newPoints);
  }

  function handleAnchorDragEnd() {
    onTransformEnd(points);
  }

  function handleGroupDragStart() {
    setShowAnchors(false);
  }

  // Update line when group is dragged
  function handleGroupDragEnd() {
    setShowAnchors(true);

    const [x1, y1, x2, y2] = points;
    const { x: xOffset, y: yOffset } = groupRef.current.getPosition();

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
      onDragStart={handleGroupDragStart}
      onDragEnd={(e) => handleGroupDragEnd(e)}
    >
      {children}

      {show && (
        <>
          {/* Anchors */}
          <Circle
            ref={anchor1Ref}
            name="anchor"
            x={points[0] - anchorOffset.x}
            y={points[1] - anchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={2 / anchorScale} // border width
            stroke="#b5b5b5" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
            hitFunc={circleHitFunc}
            // opacity={showAnchors}
          />

          <Circle
            ref={anchor2Ref}
            name="anchor"
            x={points[2] + anchorOffset.x}
            y={points[3] + anchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={2 / anchorScale} // border width
            stroke="#b5b5b5" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
            hitFunc={circleHitFunc}
            // opacity={showAnchors}
          />

          {/* Remove Button */}
          <Group opacity={showAnchors}>
            <Circle
              name="removeButton"
              x={removeButtonPoint.x}
              y={removeButtonPoint.y}
              // strokeWidth={1} // border width
              // stroke="white" // border color
              radius={anchorSize}
              fill="#ee3535"
              onClick={onRemove}
              onTap={onRemove}
              hitFunc={circleHitFunc}
            />

            <Line
              points={[
                removeButtonPoint.x - anchorSize / 2,
                removeButtonPoint.y - anchorSize / 2,
                removeButtonPoint.x + anchorSize / 2,
                removeButtonPoint.y + anchorSize / 2,
              ]}
              stroke="white"
              strokeWidth={3 / anchorScale}
              listening={false}
            />

            <Line
              points={[
                removeButtonPoint.x - anchorSize / 2,
                removeButtonPoint.y + anchorSize / 2,
                removeButtonPoint.x + anchorSize / 2,
                removeButtonPoint.y - anchorSize / 2,
              ]}
              stroke="white"
              strokeWidth={3 / anchorScale}
              listening={false}
            />
          </Group>
        </>
      )}
    </Group>
  );
}

export default LineTransformer;
