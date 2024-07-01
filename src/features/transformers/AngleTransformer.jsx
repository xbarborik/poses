/**
 * File: AngleTransformer.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Custom transformer for adding anchors to arcing shapes
 */

import { useEffect, useRef, useState } from "react";
import { Circle, Group } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getStageScale, setIsDragging } from "../canvas/canvasSlice";
import { circleHitFunc } from "../../hit_functions/circleHitFunction";
import { ANCHOR_SHADOW_WIDTH } from "../../utils/constants";
import { calcDirections } from "../../utils/helpers";

function AngleTransformer({
  children,
  show,
  primaryPoints,
  secondaryPoints,
  setPrimaryPoints,
  setSecondaryPoints,
  isDraggable,
  onDragEnd,
}) {
  const dispatch = useDispatch();
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
  const anchorOffsetDistance = 40 / anchorScale; // distance from line end

  useEffect(() => {
    console.log(stageScale);
    groupRef.current.moveToTop();
  }, [show, stageScale]);

  useEffect(() => {
    function findNewAnchorPoint(points, setAnchorOffset) {
      const { directionX, directionY, length, error } = calcDirections(points);
      if (error || length < anchorOffsetDistance) return;

      const offsetX = directionX * anchorOffsetDistance;
      const offsetY = directionY * anchorOffsetDistance;

      setAnchorOffset({ x: offsetX, y: offsetY });
    }

    findNewAnchorPoint(primaryPoints, setPrimaryAnchorOffset);
    findNewAnchorPoint(secondaryPoints, setSecondaryAnchorOffset);
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

  function handleGroupDragStart() {
    dispatch(setIsDragging(true));
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

    // Reset group origin position (top left)
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
            x={primaryPoints[2] + primaryAnchorOffset.x}
            y={primaryPoints[3] + primaryAnchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={ANCHOR_SHADOW_WIDTH / anchorScale}
            stroke="#b5b5b5"
            draggable
            onDragMove={handlePrimaryAnchorDragMove}
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
            x={secondaryPoints[2] + secondaryAnchorOffset.x}
            y={secondaryPoints[3] + secondaryAnchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={ANCHOR_SHADOW_WIDTH / anchorScale}
            stroke="#b5b5b5"
            draggable
            onDragMove={handleSecondaryAnchorDragMove}
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

export default AngleTransformer;
