import { useEffect, useRef, useState } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../../ui/CustomTransformer";
import { useDispatch } from "react-redux";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { getNewPoints } from "./circleUtils";
import useAdjustColorAndWidth from "./useAdjustColorandWidth";

function Circle({ circle, isDraggable, isSelected, onSelect }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([0, 0, 0, 0]);
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

  function handleDragMove(e) {
    const newPoints = getNewPoints(e, points);

    setPoints(newPoints);
  }

  function handleDragEnd() {
    dispatch(
      updateWithObject({
        ...circle,
        points: points,
      })
    );
  }

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
        strokeScaleEnabled={false}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransform={(e) => handleTransform(e)}
        onTransformEnd={handleTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragMove={(e) => handleDragMove(e)}
        onDragEnd={handleDragEnd}
        onTap={(e) => onSelect(e)}
        onClick={(e) => onSelect(e)}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={circle.id}
          centeredScaling={false}
          onRemove={() => dispatch(removeObject(circle.id))}
          keepRatio={true}
        />
      )}
    </>
  );
}

export default Circle;
