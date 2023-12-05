export function updateFreeHand({ updateWithObject, freeHand, position }) {
  updateWithObject({
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
