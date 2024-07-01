import { useState } from "react";

/*
  Following hook is a modified version expanded solution of code in pure JavaScript made by
  Author: Anton Lavrenov
  Source: https://konvajs.org/docs/sandbox/Multi-touch_Scale_Stage.html
*/
export function useWheelAndTouchpadZoom(stageRef, dimensions, minScale) {
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
      minScale
    );

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
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
    setScale(newScale);
  }

  return { scale, handleWheel, pos };
}
