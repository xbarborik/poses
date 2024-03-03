import { useEffect, useRef, useState } from "react";
import { Circle, Circle as CircleKonva, Group, Line, Text } from "react-konva";
import CustomTransformer from "../transformers/CustomTransformer";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectObject,
  getObjects,
  removeObject,
  setIsDragging,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { getNewPoints } from "./circleUtils";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";
import {
  HIT_DETECTION_MULTIPLIER,
  HIT_FUNC_MULTIPLIER,
} from "../../utils/constants";

function Comment({ comment, isDraggable, onSelect, isSelected }) {
  const dispatch = useDispatch();
  const groupRef = useRef();
  const objects = useSelector(getObjects);
  const [number, setNumber] = useState(0);

  const radius = 16;

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

  function handleDragStart() {
    dispatch(setIsDragging(true));
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

    dispatch(setIsDragging(false));
  }

  if (!comment?.points.length) return;

  return (
    <Group
      ref={groupRef}
      draggable={isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <CircleKonva
        listening={false}
        x={comment.points[0]}
        y={comment.points[1]}
        radius={radius * 1.35}
        fill="#b5b5b5"
        onClick={onSelect}
        onTap={onSelect}
        opacity={0.4}
      />
      <CircleKonva
        id={comment.id}
        x={comment.points[0]}
        y={comment.points[1]}
        radius={radius + 2}
        stroke={comment.color}
        strokeWidth={2}
        fill="#fff"
        onClick={onSelect}
        onTap={onSelect}
        opacity={0.8}
      />
      <Text
        id={comment.id}
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
