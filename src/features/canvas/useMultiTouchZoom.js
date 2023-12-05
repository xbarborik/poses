import { useState } from "react";

// https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
export function useMultiTouchScale(stageRef) {
  const [lastCenter, setLastCenter] = useState(null);
  const [lastDistance, setLastDistance] = useState(0);
  const [scale, setScale] = useState(1);

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function getCenter(p1, p2) {
    return {
      x: (p1.x + p2.x) / 2,
      y: (p1.y + p2.y) / 2,
    };
  }

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

      if (!lastCenter) {
        setLastCenter(getCenter(point1, point2));
        return;
      }
      const newCenter = getCenter(point1, point2);

      const distance = getDistance(point1, point2);

      const pointTo = {
        x: (newCenter.x - stage.x()) / stage.scaleX(),
        y: (newCenter.y - stage.y()) / stage.scaleX(),
      };

      const newScale =
        stage.scaleX() * (distance / (lastDistance ? lastDistance : distance));

      setLastDistance(distance);

      stage.scale({ x: newScale, y: newScale });

      const dx = newCenter.x - lastCenter.x;
      const dy = newCenter.y - lastCenter.y;

      const newPos = {
        x: newCenter.x - pointTo.x * newScale + dx,
        y: newCenter.y - pointTo.y * newScale + dy,
      };

      stage.position(newPos);

      setLastDistance(distance);
      setLastCenter(newCenter);
      setScale(newScale);
    }
  }

  const handleMultiTouchEnd = () => {
    setLastDistance(0);
    setLastCenter(null);
  };

  return { scale, handleMultiTouchMove, handleMultiTouchEnd };
}
