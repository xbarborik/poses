/**
 * File:Comment.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Hotspot circle on canvas
 */

import { useEffect, useRef, useState } from "react";
import { Circle as CircleKonva, Group, Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  getObjects,
  getOpacityLowered,
  setIsDragging,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import useAdjustColorAndWidth from "../stylePalette/useAdjustColorAndWidth";
import { LOWERED_ALPHA } from "../../utils/constants";
import { themes } from "../../utils/themes";

function Comment({
  object: comment,
  isDraggable,
  onSelect,
  isSelected,
  viewOnly,
}) {
  const dispatch = useDispatch();
  const groupRef = useRef();
  const objects = useSelector(getObjects);
  const [number, setNumber] = useState(0);
  const isOpacityLowered = useSelector(getOpacityLowered);
  const [shadowBlur, setShadowBlur] = useState(0);

  const radius = 2.5 * comment.strokeWidth;
  const hightlightWidth = 0.5 * comment.strokeWidth;

  useAdjustColorAndWidth(comment, isSelected, 1);

  useEffect(() => {
    function getNextValue() {
      const values = Object.values(objects);
      let count = 0;

      for (const object of values) {
        if (object.type === "comment") count++;
        if (object.id === comment.id) break;
      }

      return count;
    }

    setNumber(getNextValue());
  }, [objects, comment.id]);

  useEffect(() => {
    if (!viewOnly) return;

    const interval = setInterval(() => {
      setShadowBlur((prevBlur) => (prevBlur >= 12 ? -30 : prevBlur + 1));
    }, 110);

    return () => clearInterval(interval);
  }, [viewOnly]);

  function handleDragStart() {
    dispatch(setIsDragging(true));
    dispatch(updateHistory());
  }

  function handleDragEnd() {
    const [x1, y1, x2, y2] = comment.points;
    const { x: xOffset, y: yOffset } = groupRef.current.getPosition();

    const newPoints = [x1 + xOffset, y1 + yOffset, x2 + xOffset, y2 + yOffset];

    dispatch(
      updateWithObject({
        ...comment,
        points: newPoints,
      })
    );

    groupRef.current.moveToTop();
    // Reset group origin position
    groupRef.current.position({ x: 0, y: 0 });
  }

  if (!comment?.points.length) return;

  return (
    <Group
      ref={groupRef}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
    >
      <CircleKonva
        id={comment.id}
        x={comment.points[0]}
        y={comment.points[1]}
        radius={radius * 1.4}
        stroke={comment.color}
        strokeWidth={isSelected ? hightlightWidth : 0}
        fill="#b5b5b5"
        onClick={onSelect}
        onTap={onSelect}
        opacity={isSelected ? 0.8 : 0.7}
        cursor="pointer"
        shadowColor={comment.color}
        shadowBlur={shadowBlur < 0 || isSelected ? 0 : shadowBlur}
        shadowOpacity={1}
        onMouseEnter={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "pointer";
        }}
        onMouseLeave={(e) => {
          const container = e.target.getStage().container();
          container.style.cursor = "default";
        }}
      />
      <CircleKonva
        listening={false}
        x={comment.points[0]}
        y={comment.points[1]}
        radius={radius + 2}
        stroke={comment.color}
        strokeWidth={isSelected ? 0 : hightlightWidth}
        fill={themes.commentFill}
        onClick={onSelect}
        onTap={onSelect}
        opacity={0.8}
      />
      <Text
        listening={false}
        x={comment.points[0] - radius / 2}
        y={comment.points[1] - radius / 2}
        width={radius}
        height={radius}
        text={number}
        fontSize={radius}
        fill="black"
        onClick={onSelect}
        onTap={onSelect}
        align="center"
      />
    </Group>
  );
}

export default Comment;
