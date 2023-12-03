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
