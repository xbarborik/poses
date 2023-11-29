export function updateLine({ updateWithObject, line, position }) {
  const [startX, startY] = line.points;
  const { x: endX, y: endY } = position;
  updateWithObject({
    ...line,
    points: [startX, startY, endX, endY],
  });
}
