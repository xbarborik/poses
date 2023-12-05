import { useState } from "react";

// https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
export function useWheelAndTouchpadZoom(stageRef) {
  const [scale, setScale] = useState(1);

  function handleWheel(e) {
    const stage = stageRef.current;
    const scaleBy = 1.1;

    e.evt.preventDefault();

    var oldScale = stage.scaleX();
    var pointer = stage.getPointerPosition();

    var mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    let direction = e.evt.deltaY > 0 ? -1 : 1;

    // when we zoom on trackpad, e.evt.ctrlKey is true

    var newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    var newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);

    setScale(newScale);
  }

  return { scale, handleWheel };
}
