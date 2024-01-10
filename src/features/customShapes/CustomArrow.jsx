import { useRef } from "react";
import { Shape } from "react-konva";

// https://stackoverflow.com/questions/61947104/can-i-draw-a-arrow-with-different-pointer-style-with-konva-such-as-trianglefill
function CustomArrow({ points, pointerLength, pointerWidth, strokeColor }) {
  const shapeRef = useRef();

  const drawShape = (context, shape) => {
    context.beginPath();
    context.moveTo(points[0], points[1]);
    context.lineTo(points[2], points[3]);
    context.fillStrokeShape(shape);

    const PI2 = Math.PI * 2;
    const dx = points[2] - points[0];
    const dy = points[3] - points[1];
    const radians = (Math.atan2(dy, dx) + PI2) % PI2;

    context.save();
    context.beginPath();
    context.translate(points[2], points[3]);
    context.rotate(radians);
    context.moveTo(0, 0);
    context.lineTo(-pointerLength, pointerWidth / 2);
    context.moveTo(0, 0);
    context.lineTo(-pointerLength, -pointerWidth / 2);
    context.restore();
    context.fillStrokeShape(shape);
  };

  return (
    <Shape
      ref={shapeRef}
      sceneFunc={(context, shape) => drawShape(context, shape)}
      points={points}
      pointerLength={pointerLength}
      pointerWidth={pointerWidth}
      stroke={strokeColor}
    />
  );
}

export default CustomArrow;
