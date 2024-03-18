import { useEffect, useRef, useState } from "react";
import { Circle as CircleKonva, Group, Text } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import {
  getObjects,
  setIsDragging,
  updateWithObject,
} from "../canvas/canvasSlice";

function CommentContent({ comment }) {
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

  if (!comment?.points.length) return;

  return (
    <Group ref={groupRef}>
      <CircleKonva
        id={"conent" + comment.id}
        x={comment.points[0]}
        y={comment.points[1]}
        radius={radius + 2}
        stroke={comment.color}
        strokeWidth={2}
        fill="#fff"
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
        align="center"
      />
      <Text
        id={comment.id}
        x={comment.points[0] + radius * 2}
        y={comment.points[1] - radius / 2}
        height={radius}
        text={comment.text}
        fontSize={radius}
        fill="black"
        align="center"
      />
    </Group>
  );
}

export default CommentContent;
