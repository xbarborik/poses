export function updateFreeHand({ updateWithObject, freeHand, position }) {
  updateWithObject({
    ...freeHand,
    points: [...freeHand.points, position.x, position.y],
  });
}
