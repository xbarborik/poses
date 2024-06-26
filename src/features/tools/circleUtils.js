/**
 * File: circleUtilsr.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Functions for calculating points
 */

export function updateCircle({ updateObject, circle, position }) {
  const [startX, startY] = circle.points;
  const { x: endX, y: endY } = position;

  let xdif = endX - startX;
  let ydif = endY - startY;
  const radius = Math.sqrt(xdif ** 2 + ydif ** 2) / 2;

  updateObject({
    ...circle,
    points: [startX, startY, endX, endY],
    radius: radius,
    width: Math.abs(xdif),
    height: Math.abs(ydif),
  });
}

export function getNewPoints(e, previousPoints) {
  const pos = e.target.position();

  const [x1, y1, x2, y2] = previousPoints;
  return [
    pos.x - (x2 - x1) / 2,
    pos.y - (y2 - y1) / 2,
    pos.x + (x2 - x1) / 2,
    pos.y + (y2 - y1) / 2,
  ];
}
