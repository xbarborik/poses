import { useEffect, useRef } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../../ui/CustomTransformer";
import { useDispatch } from "react-redux";
import { updateHistory } from "../canvas/canvasSlice";
import { getNewPoints } from "./circleUtils";

function Circle({ circle, isDraggable, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function onTransformEnd(e) {
    const node = shapeRef.current;
    const scaleX = node.scaleX();

    node.scaleX(1);
    node.scaleY(1);

    const newPoints = getNewPoints(e, circle.points);

    const newCircle = {
      ...circle,
      radius: node.radius() * scaleX * 2,
      points: newPoints,
    };

    onChange(newCircle);
  }

  function handleDragEnd(e) {
    const newPoints = getNewPoints(e, circle.points);
    onChange({
      ...circle,
      points: newPoints,
    });
  }

  return (
    <>
      <CircleKonva
        id={circle.id}
        ref={shapeRef}
        x={(circle.points[0] + circle.points[2]) / 2}
        y={(circle.points[1] + circle.points[3]) / 2}
        radius={circle.radius / 2}
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
        strokeScaleEnabled={false}
        onTap={onSelect}
        onClick={onSelect}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransformEnd={(e) => onTransformEnd(e)}
        onDragStart={() => dispatch(updateHistory())}
        onDragEnd={(e) => handleDragEnd(e)}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={circle.id}
          centeredScaling={false}
        />
      )}
    </>
  );
}

export default Circle;
