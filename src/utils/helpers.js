import { MINIMUM_OBJECT_LENGTH } from "./constants";

// Keeps every nth point in the last line
export function smoothLine({ updateWithObject, objects, id, step }) {
  const lastLine = objects[id];
  const points = lastLine.points;

  if (lastLine.points.length <= step) return;
  // console.log("original", lastLine);
  const filteredLastLine = {
    ...lastLine,
    points: points.filter((_, i) => i % step === 0 || i % step === 1),
  };
  // console.log("filtered", filteredLastLine);
  updateWithObject(filteredLastLine);
}

export function outOfBounds({ position, startX = 1, endX, startY = 1, endY }) {
  if (
    position.x <= startX ||
    position.x >= endX ||
    position.y <= startY ||
    position.y >= endY
  ) {
    return;
  }
}

export function mapPoints(x, y, width, height) {
  return { x: x * width, y: y * height };
}

export function calcAngle(x1, y1, x2, y2) {
  const angleRadians = Math.atan2(y2 - y1, x2 - x1);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  // Ensure the angle is between 0 and 360 degrees
  return (angleDegrees + 360) % 360;
}

export function calcLength(points) {
  const dx = points[2] - points[0];
  const dy = points[3] - points[1];

  return Math.sqrt(dx * dx + dy * dy);
}

export function notLongEnoughToDraw(object) {
  return (
    (object.type === "freeHand" &&
      object.points.length <= MINIMUM_OBJECT_LENGTH) ||
    (object.type !== "freeHand" &&
      calcLength(object.points) <= MINIMUM_OBJECT_LENGTH)
  );
}

// https://stackoverflow.com/questions/60680088/konva-js-free-drawing-drag-zoom-cant-draw-correctly-with-pointer-after-d/60683019#60683019
export function getRelativePointerPosition(e) {
  const stage = e.target.getStage();
  // the function will return pointer position relative to the passed node
  var transform = stage.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  var pos = stage.getPointerPosition();

  return transform.point(pos);
}

export function getRelativePosition(point, scale) {
  const scaledX = point.x * scale;
  const scaledY = point.y * scale;

  return { x: scaledX, y: scaledY };
}
