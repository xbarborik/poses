/**
 * File: SpeechToText.js
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    utility functions used in diferent files
 */

import { MINIMUM_OBJECT_LENGTH } from "./constants";

// Keeps every nth point (x and y) in the  line
export function smoothLine({ line, step, threshold = 100 }) {
  const points = line.points;

  // Step must be an even number
  if (line.points.length <= threshold || step % 2 !== 0) return line;

  // Values at index i and i + 1 are x and y
  const filteredLine = {
    ...line,
    points: points.filter((_, i) => i % step === 0 || i % step === 1),
  };

  return filteredLine;
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

export function calcDirections(points) {
  const dx = points[2] - points[0];
  const dy = points[3] - points[1];
  const length = Math.sqrt(dx * dx + dy * dy);
  if (length === 0) return { error: true };

  const directionX = dx / length;
  const directionY = dy / length;

  return { directionX, directionY, length, error: false };
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

// Source: https://gist.github.com/ashblue/3860114
export function movePointAtAngle(point, angle, distance) {
  const angleRadians = (angle * Math.PI) / 180;
  return [
    point[0] + Math.cos(angleRadians) * distance,
    point[1] + Math.sin(angleRadians) * distance,
  ];
}

export function calcLength(points) {
  const dx = points[2] - points[0];
  const dy = points[3] - points[1];

  return Math.sqrt(dx * dx + dy * dy);
}

export function notLongEnoughToDraw(object) {
  return (
    (object.type.includes("freeHand") &&
      object.points.length <= MINIMUM_OBJECT_LENGTH) ||
    (!object.type.includes("freeHand") &&
      object.type !== "comment" &&
      calcLength(object.points) <= MINIMUM_OBJECT_LENGTH)
  );
}

export function getCenter(point1, point2) {
  return {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2,
  };
}

/*
  Following function is taken from konvajs docs
  Authors: Anton Lavrenov
  Source:  https://konvajs.org/docs/react/Canvas_Export.html
*/
export function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function convertAbsoluteToRelative(objects, dimensions) {
  function adjustPointsToRelative(points) {
    return points.map((point, index) =>
      point > 0 && point < 1
        ? point
        : index % 2 === 0
        ? point / dimensions?.width
        : point / dimensions?.height
    );
  }

  return Object.entries(objects).reduce((acc, [key, object]) => {
    const adjustedPoints = adjustPointsToRelative(object.points);
    const newObject = { ...object, points: adjustedPoints };

    if (object.secondaryPoints) {
      newObject.secondaryPoints = adjustPointsToRelative(
        object.secondaryPoints
      );
    }

    acc[key] = newObject;
    return acc;
  }, {});
}

export function convertRelativeToAbsolute(objects, dimensions) {
  function adjustPoints(points) {
    return points.map((point, index) =>
      point > 0 && point < 1
        ? index % 2 === 0
          ? point * dimensions?.width
          : point * dimensions?.height
        : point
    );
  }

  return Object.entries(objects).reduce((acc, [key, object]) => {
    const adjustedPoints = adjustPoints(object.points);
    const newObject = { ...object, points: adjustedPoints };

    if (object.secondaryPoints) {
      newObject.secondaryPoints = adjustPoints(object.secondaryPoints);
    }

    acc[key] = newObject;
    return acc;
  }, {});
}

export function idFromDate() {
  const datetimeString = new Date().toISOString().slice(0, 19);
  return Math.round(Date.parse(datetimeString) / 1000);
}
