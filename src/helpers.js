// Keeps every nth point in the last line
export function smoothLine({ objects, setObjects, id, step }) {
  const lastLine = objects[id];
  const points = lastLine.points;

  const filteredLastLine = {
    ...lastLine,
    points: points.filter((_, i) => i % step === 0 || i % step === 1),
  };

  setObjects({ ...objects, [id]: filteredLastLine });
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
