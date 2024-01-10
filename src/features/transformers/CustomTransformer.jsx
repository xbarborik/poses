import { Circle, Group, Image, Line, Transformer } from "react-konva";

import { useImage } from "react-konva-utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStageScale, setIsDragging } from "../canvas/canvasSlice";
import { circleHitFunc } from "../../hit_functions/circleHitFunction";
import {
  ANCHOR_SHADOW_WIDTH,
  HIT_DETECTION_MULTIPLIER,
} from "../../utils/constants";

function CustomTransformer({
  trRef,
  centeredScaling = true,
  onRemove,
  keepRatio = true,
  stageRef,
}) {
  const dispatch = useDispatch();
  const [tr, setTr] = useState({ x: null, y: null, width: 0, height: 0 });
  const [image] = useImage("/poses/icons/double-arrow.svg");
  const groupRef = useRef();
  const stageScale = useSelector(getStageScale);

  const buttonScale = stageScale / 0.9;
  const buttonRadius = 16 / buttonScale;
  const padding = buttonRadius / 4;

  const scaleButtonX = tr.x + tr.width - buttonRadius;
  const scaleButtonY = tr.y + tr.height - buttonRadius;

  useEffect(() => {
    getTransformerRect();

    groupRef.current.moveToTop();
    // We need trRef.current for getting buttons on initial render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trRef, trRef.current]);

  function getTransformerRect() {
    const trRect = trRef.current.getClientRect();

    const { x: xOffset, y: yOffset } = stageRef.current.getPosition();

    const scale = stageScale;

    setTr({
      x: (trRect.x - xOffset) / scale,
      y: (trRect.y - yOffset) / scale,
      width: trRect.width / scale,
      height: trRect.height / scale,
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
        onDragStart={() => dispatch(setIsDragging(true))}
        onDragMove={getTransformerRect}
        onDragEnd={() => dispatch(setIsDragging(false))}
        onTransformStart={() => dispatch(setIsDragging(true))}
        onTransform={getTransformerRect}
        onTransformEnd={() => dispatch(setIsDragging(false))}
        anchorSize={buttonRadius * 2 * stageScale}
        anchorCornerRadius={50}
        anchorFill="rgba(0, 0, 0, 0)" // Transparency
        anchorStroke="rgba(0, 0, 0, 0)"
        keepRatio={keepRatio}
        borderStroke="rgba(0,0,0,0)"
      />
      {/* Scale Button */}
      <Group listening={false}>
        <Circle
          x={scaleButtonX}
          y={scaleButtonY}
          radius={buttonRadius}
          fill="white"
          listening={false}
          strokeWidth={ANCHOR_SHADOW_WIDTH / buttonScale} // border width
          stroke="#b5b5b5" // border color
          hitFunc={circleHitFunc}
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
    </Group>
  );
}

export default CustomTransformer;
