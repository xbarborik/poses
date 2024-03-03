import { useRef } from "react";
import { Shape, Arrow, Group } from "react-konva";

// https://stackoverflow.com/questions/61947104/can-i-draw-a-arrow-with-different-pointer-style-with-konva-such-as-trianglefill
function CustomArrow({
  objectId,
  points,
  stroke,
  strokeWidth,
  fill,
  lineCap,
  pointerLength,
  pointerWidth,
  hitStrokeWidth,
  onTap,
  onClick,
  pointerAtBeginning = false,
}) {
  const shapeRef = useRef();

  const minX = Math.min(points[0], points[2]);
  const maxX = Math.max(points[0], points[2]);
  const minY = Math.min(points[1], points[3]);
  const maxY = Math.max(points[1], points[3]);

  const width = maxX - minX + pointerLength * 2;
  const height = maxY - minY + pointerWidth * 2 + 30;
  const offsetX = minX - pointerLength;
  const offsetY = minY - pointerWidth - 30;

  const localPoints = [
    points[0] - offsetX,
    points[1] - offsetY,
    points[2] - offsetX,
    points[3] - offsetY,
  ];

  function drawArrowPointer(context, x, y, angle) {
    context.save();
    context.beginPath();
    context.translate(x, y);
    context.rotate(angle);
    context.moveTo(0, 0);
    context.lineTo(-pointerLength, pointerWidth / 2);
    context.moveTo(0, 0);
    context.lineTo(-pointerLength, -pointerWidth / 2);
    context.restore();
  }

  const drawShape = (context, shape) => {
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(localPoints[0], localPoints[1]);
    context.lineTo(localPoints[2], localPoints[3]);
    context.fillStrokeShape(shape);

    const PI2 = Math.PI * 2;
    const dx = localPoints[2] - localPoints[0];
    const dy = localPoints[3] - localPoints[1];
    const radians = (Math.atan2(dy, dx) + PI2) % PI2;

    if (pointerAtBeginning) {
      const startRadians = (Math.atan2(-dy, -dx) + PI2) % PI2;
      drawArrowPointer(context, localPoints[0], localPoints[1], startRadians);
      context.fillStrokeShape(shape);
    }

    drawArrowPointer(context, localPoints[2], localPoints[3], radians);
    context.fillStrokeShape(shape);
  };

  return (
    <Group>
      <Shape
        x={offsetX}
        y={offsetY}
        width={width}
        height={height}
        className="customShape"
        ref={shapeRef}
        sceneFunc={(context, shape) => drawShape(context, shape)}
        points={points}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
        lineCap={lineCap}
        pointerLength={pointerLength}
        pointerWidth={pointerWidth}
        listening={false}
        // visible={false}
      />
      <Arrow
        className="customShape"
        id={objectId}
        points={points}
        stroke="rgba(0,0,0,0)"
        // stroke="black"
        strokeWidth={strokeWidth}
        onTap={onTap}
        onClick={onClick}
        hitStrokeWidth={hitStrokeWidth}
      />
    </Group>
  );
}

export default CustomArrow;
