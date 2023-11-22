export function updateCircle({ updateWithObject, circle, position }) {
  const [startX, startY] = circle.points;
  let xdif = position.x - startX;
  let ydif = position.y - startY;
  const radius = Math.sqrt(xdif ** 2 + ydif ** 2);

  updateWithObject({
    ...circle,
    points: [startX, startY, position.x, position.y],
    radius: radius,
  });
}
