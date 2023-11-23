// Keeps every nth point in the last line
export function smoothLine({ updateWithObject, objects, id, step }) {
  const lastLine = objects[id];
  const points = lastLine.points;

  console.log("original", lastLine);
  const filteredLastLine = {
    ...lastLine,
    points: points.filter((_, i) => i % step === 0 || i % step === 1),
  };
  console.log("filtered", filteredLastLine);
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
