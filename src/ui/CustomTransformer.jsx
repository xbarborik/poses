import { Circle, Group, Image, Line, Stage, Transformer } from "react-konva";

import { useImage } from "react-konva-utils";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStageScale } from "../features/canvas/canvasSlice";

function CustomTransformer({
  trRef,
  centeredScaling = true,
  onRemove,
  keepRatio = true,
  stageRef,
}) {
  const [tr, setTr] = useState({ x: -10, y: -10, width: 0, height: 0 });
  const [image] = useImage("/poses/icons/double-arrow.svg");
  const groupRef = useRef();
  const stageScale = useSelector(getStageScale);

  const buttonRadius = 16;

  const scaleButtonX = (tr.x + tr.width - buttonRadius / 2) / stageScale;
  const scaleButtonY = (tr.y + tr.height - buttonRadius / 2) / stageScale;
  const removeButtonX = tr.x / stageScale;
  const removeButtonY = tr.y / stageScale;

  useEffect(() => {
    getTransformerRect();

    groupRef.current.moveToTop();
    // I need trRef.current for getting buttons on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trRef, trRef.current]);

  function getTransformerRect() {
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
        onDragMove={getTransformerRect}
        onTransform={getTransformerRect}
        anchorSize={18}
        keepRatio={keepRatio}
      />

      {/* Scale Button */}
      <Group listening={false}>
        <Circle
          x={scaleButtonX}
          y={scaleButtonY}
          radius={buttonRadius}
          fill="white"
          listening={false}
          strokeWidth={2} // border width
          stroke="#b5b5b5" // border color
        />

        <Image
          image={image}
          x={scaleButtonX - (buttonRadius + buttonRadius / 4) / 2}
          y={scaleButtonY - (buttonRadius + buttonRadius / 4) / 2}
          width={buttonRadius + buttonRadius / 4}
          height={buttonRadius + buttonRadius / 4}
          listening={false}
        />
      </Group>

      {/* Remove Button */}
      <Group>
        <Circle
          name="removeButton"
          x={removeButtonX}
          y={removeButtonY}
          radius={buttonRadius}
          fill="#ee3535"
          onClick={onRemove}
          onTap={onRemove}
        />

        <Line
          points={[
            removeButtonX - buttonRadius / 2,
            removeButtonY - buttonRadius / 2,
            removeButtonX + buttonRadius / 2,
            removeButtonY + buttonRadius / 2,
          ]}
          stroke="white"
          strokeWidth={3}
          listening={false}
        />

        <Line
          points={[
            removeButtonX - buttonRadius / 2,
            removeButtonY + buttonRadius / 2,
            removeButtonX + buttonRadius / 2,
            removeButtonY - buttonRadius / 2,
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
