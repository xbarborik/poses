/**
 * File: CommentContent.js
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *  Renders comment formed of marker, wrapper and text.
 */

import { useEffect, useRef, useState } from "react";
import { Circle as CircleKonva, Group, Rect, Text } from "react-konva";
import { themes } from "../../utils/themes";

function CommentContent({
  comment,
  startX,
  startY,
  maxWidth,
  updateHeight,
  index,
  marginX,
}) {
  const textRef = useRef(null);
  const radius = 16;
  const prevHeightRef = useRef(0);
  const [textBgDimensions, setTextBgDimensions] = useState({
    width: 0,
    height: 0,
  });
  const strokeWidth = 3;
  const strokeOffset = strokeWidth / 2;

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.width();
      const textHeight = textRef.current.height();
      const padding = 12;

      // Update the height for the parent component
      const contentHeight = textHeight + padding * 2;
      if (contentHeight !== prevHeightRef.current) {
        prevHeightRef.current = contentHeight;
        updateHeight(contentHeight);
      }

      // Set the background dimensions based on the text size and padding
      setTextBgDimensions({
        width: textWidth + padding,
        height: textHeight + padding,
      });
    }
  }, [updateHeight, comment]);

  return (
    <Group>
      <CircleKonva
        id={"comment" + comment.id}
        x={startX + 2 * marginX}
        y={startY + radius}
        radius={radius}
        stroke={comment.color}
        strokeWidth={strokeWidth}
        fill={themes.commentFill}
      />
      <Text
        x={startX + marginX + strokeOffset}
        y={startY + radius / 2}
        width={radius}
        height={radius}
        text={index + 1}
        fontSize={radius}
        fill="black"
        align="center"
      />
      <Rect
        x={startX + radius * 3}
        y={startY}
        width={textBgDimensions.width}
        height={textBgDimensions.height}
        fill="white"
        cornerRadius={4}
        shadowColor={themes.secondary}
        shadowBlur={2}
        shadowOpacity={0.9}
      />
      <Text
        ref={textRef}
        x={startX + radius * 3.5}
        y={startY + radius / 2}
        text={comment.text}
        fontSize={radius * 1.2}
        fill="black"
        width={maxWidth * 0.8}
        wrap="word"
        fontFamily={themes.font}
      />
    </Group>
  );
}

export default CommentContent;
