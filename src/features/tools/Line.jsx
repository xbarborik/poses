/**
 * File: Line.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Line shape
 */

import { Line as LineKonva } from "react-konva";
import LineTransformer from "../transformers/LineTransformer";
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
import { themes } from "../../utils/themes";

function Line({ object: line, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const isOpacityLowered = useSelector(getOpacityLowered);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  useAdjustColorAndWidth(line, isSelected, 1);

  function handleChangeEnd(newPoints) {
    dispatch(updateHistory());
    dispatch(updateWithObject({ ...line, points: newPoints }));
  }

  if (!points.length) return;

  return (
    <LineTransformer
      show={isSelected}
      points={points}
      setPoints={setPoints}
      isDraggable={isDraggable}
      onTransformEnd={handleChangeEnd}
      onDragEnd={handleChangeEnd}
      onRemove={() => dispatch(removeObject(line.id))}
    >
      {/* Border */}
      <LineKonva
        listening={false}
        points={points}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={themes.shapeBorder}
        strokeWidth={line.strokeWidth * themes.shapeBorderSize}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        lineCap="round"
      />

      {/* Shape */}
      <LineKonva
        id={line.id}
        points={points}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        lineCap="round"
        onTap={onSelect}
        onClick={onSelect}
      />
    </LineTransformer>
  );
}

export default Line;
