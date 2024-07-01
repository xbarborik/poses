/**
 * File: lineUtils.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Functions for calculating new points for line tools
 */

export function updateLine({ updateObject, line, position }) {
  const [startX, startY] = line.points;
  const { x: endX, y: endY } = position;
  updateObject({
    ...line,
    points: [startX, startY, endX, endY],
  });
}
