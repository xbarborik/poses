import { Circle, Group, Image, Line, Transformer } from "react-konva";

import { useImage } from "react-konva-utils";
import { useEffect, useRef, useState } from "react";

function CustomTransformer({ trRef, centeredScaling = true, onRemove }) {
  const [tr, setTr] = useState({ x: -10, y: -10, width: 0, height: 0 });
  const [image] = useImage("/poses/icons/double-arrow.svg");
  const groupRef = useRef();

  const scaleButtonX = tr.x + tr.width - 8;
  const scaleButtonY = tr.y + tr.height - 8;
  const removeButtonX = tr.x;
  const removeButtonY = tr.y;

  useEffect(() => {
    const trRect = trRef.current.getClientRect();

    setTr({
      x: trRect.x,
      y: trRect.y,
      width: trRect.width,
      height: trRect.height,
    });

    groupRef.current.moveToTop();
    // I need trRef.current for getting buttons on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trRef, trRef.current]);

  function updateTransformer() {
    const trRect = trRef.current.getClientRect();

    setTr({
      x: trRect.x,
      y: trRect.y,
      width: trRect.width,
      height: trRect.height,
    });
  }

  return (
    <Group ref={groupRef}>
      <Transformer
        ref={trRef}
        flipEnabled={false}
        centeredScaling={centeredScaling}
        enabledAnchors={["bottom-right"]}
        rotateEnabled={false}
        onDragMove={updateTransformer}
        onTransform={updateTransformer}
        anchorSize={18}
      />

      {/* Scale Button */}
      <Group listening={false}>
        <Circle
          x={scaleButtonX}
          y={scaleButtonY}
          radius={16}
          fill="white"
          listening={false}
        />

        <Image
          image={image}
          x={scaleButtonX - 10}
          y={scaleButtonY - 10}
          width={20}
          height={20}
          listening={false}
        />
      </Group>

      {/* Remove Button */}
      <Group>
        <Circle
          name="removeButton"
          x={removeButtonX}
          y={removeButtonY}
          radius={16}
          fill="red"
          onClick={onRemove}
          onTap={onRemove}
        />

        <Line
          points={[
            removeButtonX - 8,
            removeButtonY - 8,
            removeButtonX + 8,
            removeButtonY + 8,
          ]}
          stroke="white"
          strokeWidth={3}
          listening={false}
        />

        <Line
          points={[
            removeButtonX - 8,
            removeButtonY + 8,
            removeButtonX + 8,
            removeButtonY - 8,
          ]}
          stroke="white"
          strokeWidth={3}
          listening={false}
        />
      </Group>
    </Group>
  );
}

export default CustomTransformer;
