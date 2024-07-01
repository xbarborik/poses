/**
 * File: FreeHandw.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Shape done by freehand
 */

import { Line } from "react-konva";
import { HIT_DETECTION_MULTIPLIER, LOWERED_ALPHA } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewPoints } from "./freeHandUtils";
import {
  getOpacityLowered,
  setIsDragging,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import useAdjustColorAndWidth from "../stylePalette/useAdjustColorAndWidth";
import { themes } from "../../utils/themes";

function FreeHand({ object: line, isDraggable, isSelected, onSelect }) {
  const shapeRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const isOpacityLowered = useSelector(getOpacityLowered);

  useAdjustColorAndWidth(line, isSelected);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  function handleDragMove(e) {
    const newPoints = getNewPoints(e, line.points);
    setPoints(newPoints);
    shapeRef.current.position({ x: 0, y: 0 });
  }

  function handleDragEnd() {
    shapeRef.current.position({ x: 0, y: 0 });
    dispatch(
      updateWithObject({
        ...line,
        points: points,
      })
    );
  }

  if (!points.length) return;

  return (
    <>
      {/* Border */}
      <Line
        points={points}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={themes.shapeBorder}
        strokeWidth={line.strokeWidth * themes.shapeBorderSize}
        lineCap="round"
        lineJoin="round"
        tension={0.4}
      />

      {/* Shape */}
      <Line
        id={line.id}
        ref={shapeRef}
        points={points}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        lineCap="round"
        lineJoin="round"
        draggable={isDraggable}
        onTap={onSelect}
        onClick={onSelect}
        tension={0.4}
        onDragStart={() => {
          dispatch(updateHistory());
          dispatch(setIsDragging(true));
        }}
        onDragMove={handleDragMove}
        onDragEnd={() => {
          handleDragEnd();
        }}
      />
    </>
  );
}

export default FreeHand;
