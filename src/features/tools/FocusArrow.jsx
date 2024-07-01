/**
 * File: FocusArrow.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Draw eye shape with an arrow to show eye focus on point
 */

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ARROW_POINTER_SCALE,
  HIT_DETECTION_MULTIPLIER,
  LOWERED_ALPHA,
} from "../../utils/constants";
import LineTransformer from "../transformers/LineTransformer";
import {
  getOpacityLowered,
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import useAdjustColorAndWidth from "../stylePalette/useAdjustColorAndWidth";
import CustomArrow from "../customShapes/CustomArrow";
import { themes } from "../../utils/themes";
import { Shape } from "react-konva";
import { calcAngle, movePointAtAngle } from "../../utils/helpers";

function FocusArrow({ object: arrow, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const isOpacityLowered = useSelector(getOpacityLowered);
  const eyeRef = useRef();

  useAdjustColorAndWidth(arrow, isSelected);

  useEffect(() => {
    setPoints(arrow.points);
  }, [arrow.points]);

  function handleChangeEnd(newPoints) {
    dispatch(updateHistory());
    dispatch(updateWithObject({ ...arrow, points: newPoints }));
  }

  function moveArrowStart() {
    const angle = calcAngle(points);
    const movedStartPoints = movePointAtAngle(
      points.slice(0, 2),
      angle,
      arrow.strokeWidth * 6
    ).concat(points.slice(2));
    return movedStartPoints;
  }

  function drawEyeShape(context, shape, size) {
    context.beginPath();
    context.ellipse(0, 0, size, size / 2, 0, 0, Math.PI * 2);
    context.fillStrokeShape(shape);

    context.beginPath();
    context.arc(0, 0, size / 4, 0, Math.PI * 2);
    context.closePath();
    context.fillStrokeShape(shape);
  }

  const movedStartPoints = moveArrowStart();
  if (!points.length) return;

  return (
    <LineTransformer
      show={isSelected}
      points={points}
      setPoints={setPoints}
      isDraggable={isDraggable}
      onTransformEnd={handleChangeEnd}
      onDragEnd={handleChangeEnd}
      onRemove={() => dispatch(removeObject(arrow.id))}
    >
      {/* Border */}
      <Shape
        ref={eyeRef}
        onTap={onSelect}
        onClick={onSelect}
        x={points[0]}
        y={points[1]}
        stroke={themes.shapeBorder}
        strokeWidth={((arrow.strokeWidth * 2) / 3) * themes.shapeBorderSize}
        hitStrokeWidth={arrow.strokeWidth * HIT_DETECTION_MULTIPLIER * 2}
        sceneFunc={(context, shape) =>
          drawEyeShape(context, shape, arrow.strokeWidth * 4)
        }
      />
      <CustomArrow
        listening={false}
        objectId={arrow.id}
        points={movedStartPoints}
        stroke={themes.shapeBorder}
        strokeWidth={arrow.strokeWidth * themes.shapeBorderSize}
        fill={arrow.color}
        lineCap="round"
        pointerLength={2 * arrow.strokeWidth}
        pointerWidth={2 * arrow.strokeWidth * ARROW_POINTER_SCALE}
        hitStrokeWidth={arrow.strokeWidth * HIT_DETECTION_MULTIPLIER}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* Shape */}
      <Shape
        ref={eyeRef}
        onTap={onSelect}
        onClick={onSelect}
        x={points[0]}
        y={points[1]}
        stroke={arrow.color}
        strokeWidth={(arrow.strokeWidth * 2) / 3}
        sceneFunc={(context, shape) =>
          drawEyeShape(context, shape, arrow.strokeWidth * 4)
        }
      />
      <CustomArrow
        objectId={arrow.id}
        points={movedStartPoints}
        stroke={arrow.color}
        strokeWidth={arrow.strokeWidth}
        fill={arrow.color}
        lineCap="round"
        pointerLength={2 * arrow.strokeWidth}
        pointerWidth={2 * arrow.strokeWidth * ARROW_POINTER_SCALE}
        hitStrokeWidth={arrow.strokeWidth * HIT_DETECTION_MULTIPLIER}
        onTap={onSelect}
        onClick={onSelect}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />
    </LineTransformer>
  );
}

export default FocusArrow;
