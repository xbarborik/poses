/**
 * File: FreehandArrow.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Shape done with freehand extended with arrow pointer
 */

import { Line } from "react-konva";
import {
  ARROW_POINTER_SCALE,
  HIT_DETECTION_MULTIPLIER,
  LOWERED_ALPHA,
} from "../../utils/constants";
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
import CustomArrow from "../customShapes/CustomArrow";
import { themes } from "../../utils/themes";

function FreeHandArrow({ object: line, isDraggable, isSelected, onSelect }) {
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
    dispatch(
      updateWithObject({
        ...line,
        points: points,
      })
    );
  }

  if (!points.length) return;

  const arrowHeadPoints = points.slice(-4);
  const linePoints = points.slice(0, -2);
  return (
    <>
      {/* Border */}
      <CustomArrow
        points={arrowHeadPoints}
        stroke={themes.shapeBorder}
        fill={line.color}
        strokeWidth={line.strokeWidth * 0.9 * themes.shapeBorderSize}
        pointerWidth={line.strokeWidth * 2 * ARROW_POINTER_SCALE}
        pointerLength={line.strokeWidth * 2}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        listening={false}
      />

      <Line
        listening={false}
        points={linePoints}
        stroke={themes.shapeBorder}
        strokeWidth={line.strokeWidth * themes.shapeBorderSize}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* Shape */}

      <Line
        id={line.id}
        ref={shapeRef}
        points={linePoints}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation={"source-over"}
        draggable={isDraggable}
        onDragMove={handleDragMove}
        onDragStart={() => {
          dispatch(updateHistory());
          dispatch(setIsDragging(true));
        }}
        onDragEnd={(e) => {
          handleDragEnd(e);
        }}
        onTap={onSelect}
        onClick={onSelect}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      <CustomArrow
        points={arrowHeadPoints}
        stroke={line.color}
        fill={line.color}
        strokeWidth={line.strokeWidth * 0.9}
        pointerWidth={line.strokeWidth * 2 * ARROW_POINTER_SCALE}
        pointerLength={line.strokeWidth * 2}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={line.id}
          centeredScaling={false}
          onRemove={() => dispatch(removeObject(line.id))}
          stageRef={stageRef}
        />
      )} */}
    </>
  );
}

export default FreeHandArrow;
