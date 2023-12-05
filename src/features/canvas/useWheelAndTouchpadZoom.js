import { useState } from "react";

// https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
export function useWheelAndTouchpadZoom(stageRef) {
  const [scale, setScale] = useState(1);

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

    const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);

    setScale(newScale);
  }

  return { scale, handleWheel };
}
