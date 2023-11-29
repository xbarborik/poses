import { Circle, Group, Transformer } from "react-konva";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { Html } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { removeObject } from "../features/canvas/canvasSlice";
import { useEffect, useLayoutEffect, useState } from "react";

function CustomTransformer({
  trRef,
  objectId,
  centeredScaling = true,
  isVisible,
}) {
  const dispatch = useDispatch();
  const [tr, setTr] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    console.log(isVisible);
    const trRect = trRef.current.getClientRect();

    setTr({
      x: trRect.x,
      y: trRect.y,
      width: trRect.width,
      height: trRect.height,
    });
  }, [trRef, isVisible]);

  function updateTr() {
    const trRect = trRef.current.getClientRect();

    setTr({
      x: trRect.x,
      y: trRect.y,
      width: trRect.width,
      height: trRect.height,
    });
  }

  function handleMove() {
    updateTr();
  }

  useEffect(() => {
    console.log(tr);
  }, [tr]);

  return (
    <Group>
      {/* <Html style={{ position: "absolute", left: pos.x, top: pos.y }}>
        <Button onClick={() => dispatch(removeObject(objectId))} $color={"red"}>
          <IoCloseOutline />
        </Button>
      </Html> */}

      <Transformer
        ref={trRef}
        flipEnabled={false}
        centeredScaling={centeredScaling}
        enabledAnchors={["bottom-right"]}
        rotateEnabled={false}
        onDragMove={handleMove}
        onTransform={handleMove}
        anchorSize={16}
      />

      <Circle
        x={tr.x}
        y={tr.y}
        radius={16}
        fill="red"
        onClick={() => dispatch(removeObject(objectId))}
      />

      <Circle
        x={tr.x + tr.width - 8}
        y={tr.y + tr.height - 8}
        radius={16}
        fill="white"
        onClick={() => dispatch(removeObject(objectId))}
        listening={false}
      />
    </Group>
  );
}

export default CustomTransformer;
