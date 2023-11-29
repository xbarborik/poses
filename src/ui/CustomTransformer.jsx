import { Circle, Group, Image, Line, Transformer } from "react-konva";

import { useImage } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { removeObject } from "../features/canvas/canvasSlice";
import { useEffect, useState } from "react";

function CustomTransformer({ trRef, objectId, centeredScaling = true }) {
  const dispatch = useDispatch();
  const [tr, setTr] = useState({ x: -10, y: -10, width: 0, height: 0 });
  const [image] = useImage("/poses/icons/double-arrow.svg");

  useEffect(() => {
    const trRect = trRef.current.getClientRect();

    setTr({
      x: trRect.x,
      y: trRect.y,
      width: trRect.width,
      height: trRect.height,
    });

    // I need trRef.current for getting buttons on render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trRef, trRef.current]);

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

  return (
    <Group>
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
        onTap={() => dispatch(removeObject(objectId))}
      />

      <Line
        points={[tr.x - 8, tr.y - 8, tr.x + 8, tr.y + 8]}
        stroke="white"
        strokeWidth={3}
        listening={false}
      />

      <Line
        points={[tr.x - 8, tr.y + 8, tr.x + 8, tr.y - 8]}
        stroke="white"
        strokeWidth={3}
        listening={false}
      />

      <Circle
        x={tr.x + tr.width - 8}
        y={tr.y + tr.height - 8}
        radius={16}
        fill="white"
        listening={false}
      />

      {/* <Arrow
        points={[
          tr.x + tr.width - 8 - 6,
          tr.y + tr.height - 8 - 8,
          tr.x + tr.width - 8 + 6,
          tr.y + tr.height - 8 + 8,
        ]}
        stroke="black"
        strokeWidth={3}
        listening={false}
      /> */}
      <Image
        image={image}
        x={tr.x + tr.width - 18}
        y={tr.y + tr.height - 18}
        width={20}
        height={20}
        listening={false}
      />
    </Group>
  );
}

export default CustomTransformer;
