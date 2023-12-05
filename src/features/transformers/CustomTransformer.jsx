import { Circle, Group, Image, Line, Transformer } from "react-konva";

import { useImage } from "react-konva-utils";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStageScale } from "../canvas/canvasSlice";

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
  const padding = buttonRadius / 4;

  const scaleButtonX = tr.x + tr.width - buttonRadius;
  const scaleButtonY = tr.y + tr.height - buttonRadius;
  const removeButtonX = tr.x;
  const removeButtonY = tr.y;

  useEffect(() => {
    getTransformerRect();

    groupRef.current.moveToTop();
    // We need trRef.current for getting buttons on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trRef, trRef.current]);

  function getTransformerRect() {
    const trRect = trRef.current.getClientRect();

    const { x: xOffset, y: yOffset } = stageRef.current.getPosition();

    setTr({
      x: trRect.x / stageScale - xOffset / stageScale,
      y: trRect.y / stageScale - yOffset / stageScale,
      width: trRect.width / stageScale,
      height: trRect.height / stageScale,
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
        anchorSize={buttonRadius * 2 * stageScale}
        anchorCornerRadius={50}
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
          x={scaleButtonX - (buttonRadius + padding) / 2}
          y={scaleButtonY - (buttonRadius + padding) / 2}
          width={buttonRadius + padding}
          height={buttonRadius + padding}
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
