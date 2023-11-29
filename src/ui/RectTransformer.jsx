import { useEffect, useRef, useState } from "react";
import { Circle, Group, Rect } from "react-konva";
import { calcAngle } from "../utils/helpers";

function RectTransformer({
  children,
  show,
  shape,
  isDraggable,
  onTransformEnd,
}) {
  const groupRef = useRef();
  const x = Math.min(shape.points[0], shape.points[2]);
  const y = Math.min(shape.points[1], shape.points[3]);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [anchorPos, setAnchorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setWidth(Math.abs(shape.points[2] - shape.points[0]));
    setHeight(Math.abs(shape.points[3] - shape.points[1]));
  }, [shape.points]);

  const angle = calcAngle(
    shape.points[0],
    shape.points[1],
    shape.points[2],
    shape.points[3]
  );

  const handleDragMove = (e) => {
    const newX = e.target.x();
    const newY = e.target.y();

    // Calculate the new width and height based on the movement of the draggable circle
    setWidth(newX - x);
    setHeight(newY - y);
    // Call the onTransformEnd callback with the updated width and height
    setAnchorPos({ x: newX, y: newY });
  };

  const handleDragEnd = () => {
    onTransformEnd({ x, y, width, height });
  };

  return (
    <Group ref={groupRef} draggable={isDraggable} onDragEnd={() => {}}>
      {children}
      {show && (
        <>
          <Rect
            x={x}
            y={y}
            width={width}
            height={height}
            stroke="blue"
            // rotation={angle}
          />

          <Circle x={x} y={y} radius={12} fill="red" />

          <Circle
            x={x + width}
            y={y + height}
            radius={12}
            fill="red"
            draggable
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          />
        </>
      )}
    </Group>
  );
}

export default RectTransformer;
