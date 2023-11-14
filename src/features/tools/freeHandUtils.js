export function updateFreeHand({ objects, setObjects, freeHand, position }) {
  freeHand.points = freeHand.points.concat([position.x, position.y]);
  setObjects({ ...objects, [freeHand.id]: { ...freeHand } });
}
