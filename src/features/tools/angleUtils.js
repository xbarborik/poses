/**
 * File: angleUtils.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Functions for calculating new points for angleTool
 */

import { calcDirections, calcLength } from "../../utils/helpers";

export function updateAngle({ updateObject, angleObject, position }) {
  const [startX, startY] = angleObject.points;
  const { x: endX, y: endY } = position;

  const newPoints = [startX, startY, endX, endY];
  const length = calcLength(newPoints);

  updateObject({
    ...angleObject,
    points: newPoints,
    secondaryPoints: findPerpendicularPoint(newPoints, length),
  });
}

function findPerpendicularPoint(points, distance) {
  const startX = points[0];
  const startY = points[1];

  // Determine the direction perpendicular to the line
  const { directionX, directionY } = calcDirections(points);

  //  Move a distance along the perpendicular direction at set distance
  const equidistantX = startX - distance * directionY;
  const equidistantY = startY + distance * directionX;

  return [points[0], points[1], equidistantX, equidistantY];
}
