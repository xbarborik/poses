/**
 * File: LineTransformer.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Custom transformer for adding anchors to line based shapes
 */

import { useEffect, useRef, useState } from "react";
import { Circle, Group } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getStageScale, setIsDragging } from "../canvas/canvasSlice";
import { circleHitFunc } from "../../hit_functions/circleHitFunction";
import { ANCHOR_SHADOW_WIDTH } from "../../utils/constants";
import { calcDirections } from "../../utils/helpers";

function LineTransformer({
  children,
  show,
  points,
  setPoints,
  isDraggable,
  onDragEnd,
}) {
  const dispatch = useDispatch();
  const groupRef = useRef();
  const anchor1Ref = useRef();
  const anchor2Ref = useRef();
  const stageScale = useSelector(getStageScale);
  const [anchorOffset, setAnchorOffset] = useState({ x: 0, y: 0 });

  const anchorScale = stageScale * 0.9;
  const anchorSize = 12 / anchorScale;
  const anchorOffsetDistance = 30 / anchorScale; // distance from line object

  useEffect(() => {
    groupRef.current.moveToTop();
  }, [show]);

  useEffect(() => {
    function findNewAnchorPoint() {
      // Normalize to get vector magnitude of 1

      const { directionX, directionY, length, error } = calcDirections(points);
      if (error || length < anchorOffsetDistance) return;

      const offsetX = directionX * anchorOffsetDistance;
      const offsetY = directionY * anchorOffsetDistance;

      setAnchorOffset({ x: offsetX, y: offsetY });
    }

    findNewAnchorPoint();
  }, [points, anchorOffsetDistance]);

  function handleAnchorDragMove() {
    const newPoints = [
      anchor1Ref.current.x() + anchorOffset.x,
      anchor1Ref.current.y() + anchorOffset.y,
      anchor2Ref.current.x() - anchorOffset.x,
      anchor2Ref.current.y() - anchorOffset.y,
    ];

    setPoints(newPoints);
  }

  function handleGroupDragStart() {
    dispatch(setIsDragging(true));
  }

  // Update line when group is dragged
  function handleGroupDragEnd() {
    const [x1, y1, x2, y2] = points;
    const { x: xOffset, y: yOffset } = groupRef.current.getPosition();

    const newPoints = [x1 + xOffset, y1 + yOffset, x2 + xOffset, y2 + yOffset];

    setPoints(newPoints);
    onDragEnd(newPoints);

    // Reset group origin position (top left point)
    groupRef.current.position({ x: 0, y: 0 });
  }

  return (
    <Group
      ref={groupRef}
      draggable={isDraggable}
      onDragStart={handleGroupDragStart}
      onDragEnd={handleGroupDragEnd}
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
            strokeWidth={ANCHOR_SHADOW_WIDTH / anchorScale}
            stroke="#b5b5b5"
            draggable
            onDragMove={handleAnchorDragMove}
            hitFunc={circleHitFunc}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "default";
            }}
          />

          <Circle
            ref={anchor2Ref}
            name="anchor"
            x={points[2] + anchorOffset.x}
            y={points[3] + anchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={ANCHOR_SHADOW_WIDTH / anchorScale}
            stroke="#b5b5b5"
            draggable
            onDragMove={handleAnchorDragMove}
            hitFunc={circleHitFunc}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "default";
            }}
          />
        </>
      )}
    </Group>
  );
}

export default LineTransformer;
