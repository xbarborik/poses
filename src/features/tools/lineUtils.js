export function updateLine({ updateWithObject, line, position }) {
  const [startX, startY] = line.points;
  updateWithObject({
    ...line,
    points: [startX, startY, position.x, position.y],
  });
}
