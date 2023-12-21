import { useEffect, useRef, useState } from "react";
import { Circle, Group, Line } from "react-konva";
import { useSelector } from "react-redux";
import { getStageScale } from "../canvas/canvasSlice";
import { circleHitFunc } from "../../hit_functions/circleHitFunction";

function AngleTransformer({
  children,
  show,
  primaryPoints,
  secondaryPoints,
  setPrimaryPoints,
  setSecondaryPoints,
  isDraggable,
  onTransformEnd,
  onDragEnd,
  onRemove,
}) {
  const groupRef = useRef();
  const anchor1Ref = useRef();
  const anchor2Ref = useRef();
  const [primaryAnchorOffset, setPrimaryAnchorOffset] = useState({
    x: 0,
    y: 0,
  });
  const [secondaryAnchorOffset, setSecondaryAnchorOffset] = useState({
    x: 0,
    y: 0,
  });
  const stageScale = useSelector(getStageScale);

  const anchorScale = stageScale / 0.9;
  const anchorSize = 16 / anchorScale;
  const anchorOffsetDistance = 30 / anchorScale; // distance from line object
  const removeButtonOffsetDistance = 40;

  // Use latter for simpler transformer
  const removeButtonPoint = {
    x: primaryPoints[0],
    y: primaryPoints[1],
  };

  useEffect(() => {
    groupRef.current.moveToTop();
  }, [show]);

  useEffect(() => {
    function findNewAnchorPoint(points) {
      const dx = points[2] - points[0];
      const dy = points[3] - points[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length === 0) return { x: points[0], y: points[1] };
      //console.log(length);

      const directionX = dx / length;
      const directionY = dy / length;

      const offsetX = directionX * anchorOffsetDistance;
      const offsetY = directionY * anchorOffsetDistance;

      return { x: offsetX, y: offsetY };
    }

    setPrimaryAnchorOffset(findNewAnchorPoint(primaryPoints));
    setSecondaryAnchorOffset(findNewAnchorPoint(secondaryPoints));
  }, [primaryPoints, secondaryPoints, anchorOffsetDistance]);

  function handlePrimaryAnchorDragMove() {
    const newPrimaryPoints = [
      primaryPoints[0],
      primaryPoints[1],
      anchor1Ref.current.x() - primaryAnchorOffset.x,
      anchor1Ref.current.y() - primaryAnchorOffset.y,
    ];
    setPrimaryPoints(newPrimaryPoints);
  }

  function handleSecondaryAnchorDragMove() {
    const newPrimaryPoints = [
      primaryPoints[0],
      primaryPoints[1],
      anchor2Ref.current.x() - secondaryAnchorOffset.x,
      anchor2Ref.current.y() - secondaryAnchorOffset.y,
    ];
    setSecondaryPoints(newPrimaryPoints);
  }

  function handleAnchorDragEnd() {
    onTransformEnd(primaryPoints, secondaryPoints);
  }

  // Update line when group is dragged
  function handleGroupDragEnd() {
    let [x1, y1, x2, y2] = primaryPoints;
    const { x: xOffset, y: yOffset } = groupRef.current.getPosition();

    const newPrimaryPoints = [
      x1 + xOffset,
      y1 + yOffset,
      x2 + xOffset,
      y2 + yOffset,
    ];
    [x1, y1, x2, y2] = secondaryPoints;

    const newSecondaryPoints = [
      x1 + xOffset,
      y1 + yOffset,
      x2 + xOffset,
      y2 + yOffset,
    ];

    setPrimaryPoints(newPrimaryPoints);
    setSecondaryPoints(newSecondaryPoints);
    onDragEnd(newPrimaryPoints, newSecondaryPoints);

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
            ref={anchor1Ref}
            name="anchor"
            x={primaryPoints[2] + primaryAnchorOffset.x}
            y={primaryPoints[3] + primaryAnchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={2 / anchorScale} // border width
            stroke="#b5b5b5" // border color
            draggable
            onDragMove={(e) => handlePrimaryAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
            hitFunc={circleHitFunc}
          />

          <Circle
            ref={anchor2Ref}
            name="anchor"
            x={secondaryPoints[2] + secondaryAnchorOffset.x}
            y={secondaryPoints[3] + secondaryAnchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={2 / anchorScale} // border width
            stroke="#b5b5b5" // border color
            draggable
            onDragMove={(e) => handleSecondaryAnchorDragMove(e)}
            onDragEnd={(e) => handleAnchorDragEnd(e)}
            hitFunc={circleHitFunc}
          />

          {/* Remove Button */}
          <Group>
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

export default AngleTransformer;
