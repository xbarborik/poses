import { Shape } from "react-konva";

function CircleRotator({ x, y, arrowLength, scale = 1, strokeWidth = 4 }) {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        let radius = 25 * scale;
        let top = y - radius - arrowLength;
        let ratio = 3;
        context.beginPath();
        context.arc(x, y, radius, 0, 90);
        context.moveTo(x, y - radius);
        context.lineTo(x, top);
        context.moveTo(x - radius / ratio, top);
        context.lineTo(x + radius / ratio, top);
        context.lineTo(x, top - radius / ratio);
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      stroke="red"
      strokeWidth={strokeWidth}
      draggable
    />
  );
}

export default CircleRotator;
