export function updateFreeHand({ objects, setObjects, freeHand, position }) {
  freeHand.points = freeHand.points.concat([position.x, position.y]);
  objects.splice(objects.length - 1, 1, freeHand);
  setObjects(objects.concat());
}
