import { Shape, Arrow } from "react-konva";

/*
  Following shape is a modified version of code in pure JavaScript made by
  Author: Anton Lavrenov
  Source: https://stackoverflow.com/questions/61947104/can-i-draw-a-arrow-with-different-pointer-style-with-konva-such-as-trianglefill
*/
function CustomArrow({
  objectId,
  points,
  stroke,
  strokeWidth,
  fill,
  pointerLength,
  pointerWidth,
  hitStrokeWidth,
  onTap,
  onClick,
  pointerAtBeginning = false,
  listening,
}) {
  const [startX, startY, endX, endY] = points;
  const offsetX = Math.min(startX, endX) - pointerLength;
  const offsetY = Math.min(startY, endY) - pointerWidth;
  const angle = Math.atan2(endY - startY, endX - startX);

  function drawPointer(context, x, y, angle) {
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.moveTo(0, 0);
    context.lineTo(-pointerLength, pointerWidth);
    context.moveTo(0, 0);
    context.lineTo(-pointerLength, -pointerWidth);
    context.restore();
  }

  function drawShape(context, shape) {
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(startX - offsetX, startY - offsetY);
    context.lineTo(endX - offsetX, endY - offsetY);
    context.fillStrokeShape(shape);

    if (pointerAtBeginning) {
      drawPointer(
        context,
        startX - offsetX,
        startY - offsetY,
        Math.atan2(startY - endY, startX - endX)
      );
      context.fillStrokeShape(shape);
    }
    drawPointer(context, endX - offsetX, endY - offsetY, angle);
    context.fillStrokeShape(shape);
  }

  return (
    <>
      <Shape
        x={offsetX}
        y={offsetY}
        sceneFunc={drawShape}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill={fill}
      />
      <Arrow
        id={objectId}
        points={points}
        stroke="rgba(0,0,0,0)"
        strokeWidth={strokeWidth}
        onTap={onTap}
        onClick={onClick}
        hitStrokeWidth={hitStrokeWidth}
        listening={listening}
      />
    </>
  );
}

export default CustomArrow;
