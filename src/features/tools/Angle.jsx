/**
 * File: Angle.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Using Konva components renders angle shape and custom transformer to control it.
 */

import { Arc, Line as LineKonva, Text } from "react-konva";
import { HIT_DETECTION_MULTIPLIER, LOWERED_ALPHA } from "../../utils/constants";
import {
  getOpacityLowered,
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAdjustColorAndWidth from "../stylePalette/useAdjustColorAndWidth";
import AngleTransformer from "../transformers/AngleTransformer";
import { calcAngle, calcLength } from "../../utils/helpers";
import { themes } from "../../utils/themes";

// formula: https://wumbo.net/formulas/angle-between-two-vectors-arc-cosine/#formula
function calcLinesAngle(line1, line2) {
  // Create vectors
  let a = { x: line1[2] - line1[0], y: line1[3] - line1[1] };
  let b = { x: line2[2] - line2[0], y: line2[3] - line2[1] };

  // Calculate dot product a * b
  let dotProduct = a.x * b.x + a.y * b.y;

  // Calculate magnitudes
  let magnitudeA = Math.sqrt(a.x * a.x + a.y * a.y);
  let magnitudeB = Math.sqrt(b.x * b.x + b.y * b.y);

  // Calculate the cosine of the angle
  let angle = Math.acos(dotProduct / (magnitudeA * magnitudeB));

  // Calculate the determinant to check which way the angle should go
  let determinant = a.x * b.y - a.y * b.x;

  if (determinant < 0) {
    angle = 2 * Math.PI - angle;
  }

  // Convert to degrees
  return angle * (180 / Math.PI);
}

function Angle({ object: angleObject, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [primaryLinePoints, setPrimaryLinePoints] = useState([]);
  const [secondaryLinePoints, setSecondaryLinePoints] = useState([]);
  const [angle, setAngle] = useState(0);
  const isOpacityLowered = useSelector(getOpacityLowered);

  const radius = 16;

  useAdjustColorAndWidth(angleObject, isSelected);

  useEffect(() => {
    setPrimaryLinePoints(angleObject.points);
    setSecondaryLinePoints(angleObject.secondaryPoints);
  }, [angleObject.points, angleObject.secondaryPoints]);

  useEffect(() => {
    if (primaryLinePoints.length > 0) {
      const newAngle = calcLinesAngle(primaryLinePoints, secondaryLinePoints);
      setAngle(newAngle);
    }
  }, [primaryLinePoints, secondaryLinePoints]);

  const rotationAngle = calcAngle(primaryLinePoints);
  const arcLength = calcArcLength();

  function handleChangeEnd(newPrimaryPoints, newSecondaryPoints) {
    dispatch(updateHistory());
    dispatch(
      updateWithObject({
        ...angleObject,
        points: newPrimaryPoints,
        secondaryPoints: newSecondaryPoints,
      })
    );
  }

  function calcArcLength() {
    const primaryLen = calcLength(primaryLinePoints);
    const secondaryLen = calcLength(secondaryLinePoints);
    return Math.min(primaryLen, secondaryLen) / 3;
  }

  if (!primaryLinePoints.length) return;

  return (
    <AngleTransformer
      show={isSelected}
      primaryPoints={primaryLinePoints}
      secondaryPoints={secondaryLinePoints}
      setPrimaryPoints={setPrimaryLinePoints}
      setSecondaryPoints={setSecondaryLinePoints}
      isDraggable={isDraggable}
      onTransformEnd={handleChangeEnd}
      onDragEnd={handleChangeEnd}
      onRemove={() => dispatch(removeObject(angleObject.id))}
    >
      {/* Border */}
      <LineKonva
        listening={false}
        points={primaryLinePoints}
        stroke={themes.shapeBorder}
        strokeWidth={angleObject.strokeWidth * themes.shapeBorderSize}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />
      <LineKonva
        listening={false}
        points={secondaryLinePoints}
        stroke={themes.shapeBorder}
        strokeWidth={angleObject.strokeWidth * themes.shapeBorderSize}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />
      <Arc
        listening={false}
        x={primaryLinePoints[0]}
        y={primaryLinePoints[1]}
        stroke={themes.shapeBorder}
        strokeWidth={angleObject.strokeWidth * themes.shapeBorderSize}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        angle={angle}
        rotation={rotationAngle}
        lineJoin="round"
        innerRadius={arcLength}
        outerRadius={arcLength}
        closed={false}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* Shape */}
      <LineKonva
        id={angleObject.id}
        points={primaryLinePoints}
        stroke={angleObject.color}
        strokeWidth={angleObject.strokeWidth}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        onTap={onSelect}
        onClick={onSelect}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />
      <LineKonva
        id={angleObject.id}
        points={secondaryLinePoints}
        stroke={angleObject.color}
        strokeWidth={angleObject.strokeWidth}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        onTap={() => onSelect()}
        onClick={() => onSelect()}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />
      <Arc
        id={angleObject.id}
        x={primaryLinePoints[0]}
        y={primaryLinePoints[1]}
        strokeWidth={angleObject.strokeWidth}
        stroke={angleObject.color}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        angle={angle}
        rotation={rotationAngle}
        lineJoin="round"
        innerRadius={arcLength}
        outerRadius={arcLength}
        onTap={() => onSelect()}
        onClick={() => onSelect()}
        closed={false}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      <Text
        id={angleObject.id}
        x={angleObject.points[0] - radius}
        y={angleObject.points[1] - radius / 2}
        width={radius * 2.5}
        height={radius}
        text={`${angle.toFixed(0)}`}
        fontSize={radius * 1.4}
        fontStyle="bold"
        fill="white"
        shadowColor="black"
        shadowBlur={20}
        shadowOpacity={1}
        onClick={onSelect}
        onTap={onSelect}
        align="center"
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />
    </AngleTransformer>
  );
}

export default Angle;
