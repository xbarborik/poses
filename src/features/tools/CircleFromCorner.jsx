import { useEffect, useRef, useState } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../transformers/CustomTransformer";
import { useDispatch } from "react-redux";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { getNewPoints } from "./circleUtils";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";
import {
  HIT_DETECTION_MULTIPLIER,
  HIT_FUNC_MULTIPLIER,
} from "../../utils/constants";

function Circle({ circle, isDraggable, isSelected, onSelect, stageRef }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const [radius, setRadius] = useState(0);

  useAdjustColorAndWidth(circle, isSelected);

  useEffect(() => {
    setPoints(circle.points);
    setRadius(circle.radius);
  }, [circle]);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function customHitFunc(context, shape) {
    context.beginPath();
    context.arc(0, 0, shape.attrs.radius * HIT_FUNC_MULTIPLIER, 0, 2 * Math.PI);
    context.closePath();
    context.fillStrokeShape(shape);
  }

  function handleTransform(e) {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const scaledPoints = points.map((value, index) => {
      return index % 2 === 0 ? value * scaleX : value * scaleY;
    });

    const newPoints = getNewPoints(e, scaledPoints);

    setRadius(node.radius() * scaleX * 2);
    setPoints(newPoints);
  }

  function handleTransformEnd() {
    const newCircle = {
      ...circle,
      radius: radius,
      points: points,
    };

    dispatch(updateWithObject(newCircle));
  }

  function handleDragEnd(e) {
    dispatch(
      updateWithObject({
        ...circle,
        points: getNewPoints(e, circle.points),
      })
    );
  }

  if (!points.length) return;

  return (
    <>
      <CircleKonva
        id={circle.id}
        ref={shapeRef}
        x={(points[0] + points[2]) / 2}
        y={(points[1] + points[3]) / 2}
        radius={radius / 2}
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransform={(e) => handleTransform(e)}
        onTransformEnd={handleTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragEnd={(e) => handleDragEnd(e)}
        onTap={onSelect}
        onClick={onSelect}
        hitStrokeWidth={circle.strokeWidth * HIT_DETECTION_MULTIPLIER * 100}
        hitFunc={customHitFunc}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={circle.id}
          centeredScaling={false}
          onRemove={() => dispatch(removeObject(circle.id))}
          keepRatio={true}
          stageRef={stageRef}
        />
      )}
    </>
  );
}

export default Circle;
