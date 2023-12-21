import { calcLength } from "../../utils/helpers";

export function updateAngle({ updateWithObject, angleObject, position }) {
  const [startX, startY] = angleObject.points;
  const { x: endX, y: endY } = position;

  const newPoints = [startX, startY, endX, endY];
  const length = calcLength(newPoints);

  updateWithObject({
    ...angleObject,
    points: newPoints,
    secondaryPoints: findPerpendicularPoint(newPoints, length),
    // secondaryPoints: [startX, startY, startX + length / 2, startY],
  });
}

// https://stackoverflow.com/questions/133897/how-do-you-find-a-point-at-a-given-perpendicular-distance-from-a-line
function findPerpendicularPoint(points, distance) {
  // Find the midpoint
  const midX = points[0];
  const midY = points[1];

  // Determine the direction perpendicular to the line
  const dx = points[2] - points[0];
  const dy = points[3] - points[1];
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return { x: points[0], y: points[1] };

  const directionX = dx / length;
  const directionY = dy / length;

  //  Move a distance along the perpendicular direction
  const equidistantX = midX + distance * directionY * -1;
  const equidistantY = midY - distance * directionX * -1;

  return [points[0], points[1], equidistantX, equidistantY];
}
