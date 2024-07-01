import { useState } from "react";
import { calcLength, getCenter } from "../../utils/helpers";

/*
  Following hook is  a modified version and expanded solution of code in pure JavaScript made by
  Author: Anton Lavrenov
  Source: https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
*/
export function useMultiTouchScale(stageRef, dimensions, minScale = 1) {
  const [oldCenter, setOldCenter] = useState(null);
  const [lastDistance, setLastDistance] = useState(0);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMultiTouchMove(e) {
    e.evt.preventDefault();

    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    const stage = stageRef.current;

    if (touch1 && touch2) {
      const point1 = {
        x: touch1.clientX,
        y: touch1.clientY,
      };
      const point2 = {
        x: touch2.clientX,
        y: touch2.clientY,
      };

      const newCenter = getCenter(point1, point2);

      if (!oldCenter) {
        setOldCenter(newCenter);
        return;
      }

      const distance = calcLength([point1.x, point1.y, point2.x, point2.y]);
      const oldScale = stage.scaleX();
      const pointTo = {
        x: (newCenter.x - stage.x()) / oldScale,
        y: (newCenter.y - stage.y()) / oldScale,
      };

      const newScale = Math.max(
        oldScale * (distance / (lastDistance ? lastDistance : distance)),
        minScale
      );

      stage.scale({ x: newScale, y: newScale });

      const dx = newCenter.x - oldCenter.x;
      const dy = newCenter.y - oldCenter.y;

      const newPos = {
        x: newCenter.x - pointTo.x * newScale + dx,
        y: newCenter.y - pointTo.y * newScale + dy,
      };

      // Calculate boundaries
      const boundaryX = (dimensions.width * (1 - minScale)) / 2;
      const boundaryY = (dimensions.height * (1 - minScale)) / 2;

      newPos.x = Math.min(
        Math.max(newPos.x, dimensions.width * (1 - newScale) - boundaryX),
        boundaryX
      );

      newPos.y = Math.min(
        Math.max(newPos.y, dimensions.height * (1 - newScale) - boundaryY),
        boundaryY
      );

      stage.position(newPos);
      setPos(newPos);

      setLastDistance(distance);
      setOldCenter(newCenter);
      setScale(newScale);
    }
  }

  const handleMultiTouchEnd = () => {
    setLastDistance(0);
    setOldCenter(null);
    if (scale === 1) {
      setPos({ x: 0, y: 0 });
    }
  };

  return {
    scale,
    handleMultiTouchMove,
    handleMultiTouchEnd,
    pos,
  };
}
