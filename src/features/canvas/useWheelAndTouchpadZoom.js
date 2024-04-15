import { useState } from "react";

// https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
export function useWheelAndTouchpadZoom(stageRef, dimensions) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleWheel(e) {
    const stage = stageRef.current;
    const scaleBy = 1.1;

    e.evt.preventDefault();

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? -1 : 1;

    const newScale = Math.max(
      direction > 0 ? oldScale * scaleBy : oldScale / scaleBy,
      1
    );

    stage.scale({ x: newScale, y: newScale });

    const dx = -e.evt.deltaX;
    const dy = -e.evt.deltaY;

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
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

    stage.position(newPos);
    setPos(newPos);
    setScale(newScale);
  }

  return { scale, handleWheel, pos };
}
