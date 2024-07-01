/**
 * File: freeHandUtils.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Functions for calculating new points for freehand tools
 */

export function updateFreeHand({ updateObject, freeHand, position }) {
  updateObject({
    ...freeHand,
    points: [...freeHand.points, position.x, position.y],
  });
}

export function getNewPoints(e, previousPoints) {
  const offset = e.target.position();

  const newPoints = previousPoints.map((value, i) =>
    i % 2 == 0 ? value + offset.x : value + offset.y
  );

  return newPoints;
}
