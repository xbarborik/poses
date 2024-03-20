import { MINIMUM_OBJECT_LENGTH } from "./constants";

// Keeps every nth point in the last line
export function smoothLine({ updateWithObject, objects, id, step }) {
  const line = objects[id];
  const points = line.points;

  if (line.points.length <= step) return;

  const filteredLine = {
    ...line,
    points: points.filter((_, i) => i % step === 0 || i % step === 1),
  };

  updateWithObject(filteredLine);
}

export function outOfBounds({ position, startX = 1, endX, startY = 1, endY }) {
  if (
    position.x <= startX ||
    position.x >= endX ||
    position.y <= startY ||
    position.y >= endY
  ) {
    return;
  }
}

export function mapPoints(x, y, width, height) {
  return { x: x * width, y: y * height };
}

export function calcAngle(points) {
  const [x1, y1, x2, y2] = points;
  const angleRadians = Math.atan2(y2 - y1, x2 - x1);
  const angleDegrees = (angleRadians * 180) / Math.PI;

  return angleDegrees;
}

export function calcLength(points) {
  const dx = points[2] - points[0];
  const dy = points[3] - points[1];

  return Math.sqrt(dx * dx + dy * dy);
}

export function notLongEnoughToDraw(object, pad) {
  return (
    (object.type.includes("freeHand") &&
      object.points.length <= MINIMUM_OBJECT_LENGTH) ||
    (!object.type.includes("freeHand") &&
      object.type !== "comment" &&
      calcLength(object.points) <= MINIMUM_OBJECT_LENGTH)
  );
}

// https://stackoverflow.com/questions/60680088/konva-js-free-drawing-drag-zoom-cant-draw-correctly-with-pointer-after-d/60683019#60683019
export function getRelativePointerPosition(e) {
  const stage = e.target.getStage();
  // the function will return pointer position relative to the passed node
  var transform = stage.getAbsoluteTransform().copy();
  // to detect relative position we need to invert transform
  transform.invert();

  var pos = stage.getPointerPosition();

  return transform.point(pos);
}

export function getRelativePosition(point, scale) {
  const scaledX = point.x * scale;
  const scaledY = point.y * scale;

  return { x: scaledX, y: scaledY };
}

export function getCenter(point1, point2) {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };
}

export function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// https://natclark.com/tutorials/javascript-lighten-darken-hex-color/
export function darkenColor(hexColor, magnitude) {
  hexColor = hexColor.replace(`#`, ``);
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
  } else {
    return hexColor;
  }
}

export function idFromDate() {
  const datetimeString = new Date().toISOString().slice(0, 19);
  return Math.round(Date.parse(datetimeString) / 1000);
}
