export function updateLine({ objects, setObjects, line, position }) {
  const [startX, startY] = line.points;
  line.points = [startX, startY, position.x, position.y];
  objects.splice(objects.length - 1, 1, line);
  setObjects(objects.concat());
}
