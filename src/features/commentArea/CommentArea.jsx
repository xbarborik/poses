/**
 * File: CommentArea.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *  Generates comment section visible while exporting image
 */

import { useEffect, useState } from "react";
import { Group, Rect } from "react-konva";
import { useSelector } from "react-redux";
import { getIsExporting, getObjects } from "../canvas/canvasSlice";
import CommentContent from "./CommentContent";
import { themes } from "../../utils/themes";

function calculateTotalHeight(heightsMap) {
  return Object.values(heightsMap).reduce((total, value) => total + value, 0);
}

function CommentArea({ startX, startY, maxWidth }) {
  const objects = useSelector(getObjects);
  const [comments, setComments] = useState([]);
  const isExporting = useSelector(getIsExporting);
  const [heights, setHeights] = useState({});
  const marginY = 5;

  useEffect(() => {
    const filteredComments = Object.values(objects).filter(
      (obj) => obj.type === "comment"
    );

    setComments(filteredComments);
  }, [objects]);

  function handleUpdateHeight(index, height) {
    setHeights((prev) => ({
      ...prev,
      [index]: height,
    }));
  }

  const totalHeight = calculateTotalHeight(heights);

  if (!isExporting) return null;

  return (
    <Group name="commentArea">
      <Rect
        x={startX}
        y={startY}
        width={maxWidth}
        height={totalHeight}
        fill={themes.canvasBackground}
      />
      {comments.map((comment, index) => {
        const offsetY = calculateTotalHeight(
          Object.fromEntries(
            Object.entries(heights).filter(([key]) => key < index)
          )
        );

        return (
          <CommentContent
            key={`comment_${comment.id}`}
            comment={comment}
            startX={startX}
            startY={startY + marginY + offsetY}
            maxWidth={maxWidth}
            updateHeight={(height) => handleUpdateHeight(index, height)}
            index={index}
            marginX={10}
          />
        );
      })}
    </Group>
  );
}

export default CommentArea;
