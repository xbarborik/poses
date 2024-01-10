import { useState } from "react";
import { getCenter } from "../../utils/helpers";

// https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
export function useMultiTouchScale(stageRef, dimensions) {
  const [oldCenter, setOldCenter] = useState(null);
  const [lastDistance, setLastDistance] = useState(0);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function getDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function handleMultiTouchMove(e) {
    e.evt.preventDefault();

    const touch1 = e.evt.touches[0];
    const touch2 = e.evt.touches[1];

    // console.log(e.evt.touches[0].clientX, e.evt.touches[0].clientY);
    // console.log(e.evt.touches[1].clientX, e.evt.touches[1].clientY);

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

      const distance = getDistance(point1, point2);

      const oldScale = stage.scaleX();

      const pointTo = {
        x: (newCenter.x - stage.x()) / oldScale,
        y: (newCenter.y - stage.y()) / oldScale,
      };

      const newScale = Math.max(
        oldScale * (distance / (lastDistance ? lastDistance : distance)),
        1
      );

      stage.scale({ x: newScale, y: newScale });

      const dx = newCenter.x - oldCenter.x;
      const dy = newCenter.y - oldCenter.y;

      const newPos = {
        x: newCenter.x - pointTo.x * newScale + dx,
        y: newCenter.y - pointTo.y * newScale + dy,
      };

      //constrained
      newPos.x = Math.min(
        Math.max(newPos.x, -dimensions.width * (newScale - 1)),
        0
      );
      newPos.y = Math.min(
        Math.max(newPos.y, -dimensions.height * (newScale - 1)),
        0
      );
      // console.log("np", newPos.x, newPos.y);
      // console.log("oc", oldCenter.x, oldCenter.y);
      // console.log("nc", newCenter.x, newCenter.y);

      //console.log("Before Stage Pos", stage.position());
      stage.position(newPos);
      setPos(newPos);
      //console.log("After Stage Pos", stage.position());

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
