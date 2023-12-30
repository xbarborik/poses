import { Arc, Circle, Line as LineKonva, Text } from "react-konva";
import LineTransformer from "../transformers/LineTransformer";
import { HIT_DETECTION_MULTIPLIER } from "../../utils/constants";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";
import AngleTransformer from "../transformers/AngleTransformer";
import { calcAngle, calcLength } from "../../utils/helpers";

function calcLinesAngle(line1, line2) {
  // Create vectors
  let a = { x: line1[2] - line1[0], y: line1[3] - line1[1] };
  let b = { x: line2[2] - line2[0], y: line2[3] - line2[1] };

  // Calculate dot product
  let dotProduct = a.x * b.x + a.y * b.y;

  // Calculate magnitudes
  let magnitudeA = Math.sqrt(a.x * a.x + a.y * a.y);
  let magnitudeB = Math.sqrt(b.x * b.x + b.y * b.y);

  // Calculate the cosine of the angle
  let angle = Math.acos(dotProduct / (magnitudeA * magnitudeB));

  // Calculate the cross product to determine the sign
  let crossProduct = a.x * b.y - a.y * b.x;

  // If cross product is negative, the angle is more than 180 degrees
  if (crossProduct < 0) {
    angle = 2 * Math.PI - angle;
  }

  // Convert to degrees
  return angle * (180 / Math.PI);
}

function Angle({ angleObject, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [primaryLinePoints, setPrimaryLinePoints] = useState([]);
  const [secondaryLinePoints, setSecondaryLinePoints] = useState([]);
  const [angle, setAngle] = useState(0);

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
    // console.log(Math.min(primaryLen, secondaryLen) / 2);
    return Math.min(primaryLen, secondaryLen) / 2;
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
      <LineKonva
        id={angleObject.id}
        points={primaryLinePoints}
        stroke={angleObject.color}
        strokeWidth={angleObject.strokeWidth}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        onTap={onSelect}
        onClick={onSelect}
      />
      <LineKonva
        id={angleObject.id}
        points={secondaryLinePoints}
        stroke={angleObject.color}
        strokeWidth={angleObject.strokeWidth}
        hitStrokeWidth={angleObject.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        onTap={() => onSelect()}
        onClick={() => onSelect()}
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
        outerRadius={arcLength}
        onTap={() => onSelect()}
        onClick={() => onSelect()}
      />

      {/* <Circle
        id={angleObject.id}
        x={angleObject.points[0]}
        y={angleObject.points[1]}
        radius={radius}
        stroke="#fff"
        strokeWidth={1}
        fill="#fff"
        onClick={onSelect}
        onTap={onSelect}
        opacity={0.8}
      /> */}

      <Text
        id={angleObject.id}
        x={angleObject.points[0] - radius}
        y={angleObject.points[1] - radius / 2}
        width={radius * 2}
        height={radius}
        text={`${angle.toFixed(0)}`}
        fontSize={radius}
        fontStyle="bold"
        fill="white"
        stroke="black"
        strokeWidth={1}
        onClick={onSelect}
        onTap={onSelect}
        align="center"
      />
    </AngleTransformer>
  );
}

export default Angle;
