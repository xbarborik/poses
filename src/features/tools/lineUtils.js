export function updateLine({ objects, setObjects, line, position }) {
  const [startX, startY] = line.points;
  line.points = [startX, startY, position.x, position.y];
  setObjects({ ...objects, [line.id]: { ...line } });
}
