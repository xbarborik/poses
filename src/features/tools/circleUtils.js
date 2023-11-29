export function updateCircle({ updateWithObject, circle, position }) {
  const [startX, startY] = circle.points;
  const { x: endX, y: endY } = position;

  let xdif = endX - startX;
  let ydif = endY - startY;
  const radius = Math.sqrt(xdif ** 2 + ydif ** 2);

  updateWithObject({
    ...circle,
    points: [startX, startY, endX, endY],
    radius: radius,
    width: Math.abs(xdif),
    height: Math.abs(ydif),
  });
}
