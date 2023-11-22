export function updateCircle({ updateWithObject, circle, position }) {
  const [startX, startY] = circle.points;
  circle.points = [startX, startY, position.x, position.y];

  let xdif = position.x - startX;
  let ydif = position.y - startY;
  circle.radius = Math.sqrt(xdif ** 2 + ydif ** 2);

  updateWithObject(circle);
}
