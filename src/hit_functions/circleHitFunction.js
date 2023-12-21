import { HIT_FUNC_MULTIPLIER } from "../utils/constants";

export function circleHitFunc(context, shape) {
  context.beginPath();
  context.arc(0, 0, shape.attrs.radius * HIT_FUNC_MULTIPLIER, 0, 2 * Math.PI);
  context.closePath();
  context.fillStrokeShape(shape);
}
