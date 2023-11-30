import { Line } from "react-konva";
import { hitDetectionMultiplier } from "../../utils/constants";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import CustomTransformer from "../../ui/CustomTransformer";
import { getNewPoints } from "./freeHandUtils";

function FreeHand({ line, isDraggable, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // https://stackoverflow.com/questions/61048076/how-to-get-new-points-of-line-after-transformation-in-konvajs
  function handleTransformEnd(e) {
    const node = shapeRef.current;
    const scaleX = node.scaleX();

    node.scaleX(1);
    node.scaleY(1);

    const scaledPoints = line.points.map((value) => value * scaleX);

    const newLine = {
      ...line,
      points: getNewPoints(e, scaledPoints),
    };

    onChange(newLine);

    shapeRef.current.position({ x: 0, y: 0 });
  }

  function handleDragEnd(e) {
    const offset = e.target.position();

    const newPoints = line.points.map((value, i) =>
      i % 2 == 0 ? value + offset.x : value + offset.y
    );

    onChange({
      ...line,
      points: newPoints,
    });

    shapeRef.current.position({ x: 0, y: 0 });
  }

  return (
    <>
      <Line
        id={line.id}
        ref={shapeRef}
        points={line.points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation={"source-over"}
        draggable={isDraggable}
        onDragEnd={(e) => handleDragEnd(e)}
        onTransformEnd={(e) => handleTransformEnd(e)}
        strokeScaleEnabled={false}
        hitStrokeWidth={line.strokeWidth * hitDetectionMultiplier}
        onClick={onSelect}
        onTouchStart={onSelect}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={line.id}
          centeredScaling={false}
        />
      )}
    </>
  );
}

export default FreeHand;
