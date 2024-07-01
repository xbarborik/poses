/**
 * File: CircleFromCorner.jsx
 * Project: Commenting on Poses
 * Author: Martin Barborík
 * Login: xbarbo10
 * Description:
 *    Draw circle shape and attach transformer
 */

import { useEffect, useRef, useState } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../transformers/CustomTransformer";
import { useDispatch, useSelector } from "react-redux";
import {
  getOpacityLowered,
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { getNewPoints } from "./circleUtils";
import useAdjustColorAndWidth from "../stylePalette/useAdjustColorAndWidth";
import { HIT_DETECTION_MULTIPLIER, LOWERED_ALPHA } from "../../utils/constants";
import { themes } from "../../utils/themes";

function Circle({
  object: circle,
  isDraggable,
  isSelected,
  onSelect,
  stageRef,
}) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const [radius, setRadius] = useState(0);
  const isOpacityLowered = useSelector(getOpacityLowered);

  useAdjustColorAndWidth(circle, isSelected);

  useEffect(() => {
    setPoints(circle.points);
    setRadius(circle.radius);
  }, [circle]);

  useEffect(() => {
    if (trRef?.current && isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleTransform(e) {
    const shape = shapeRef.current;
    const scaleX = shape.scaleX();
    const scaleY = shape.scaleY();

    shape.scaleX(1);
    shape.scaleY(1);

    const scaledPoints = points.map((value, index) => {
      return index % 2 === 0 ? value * scaleX : value * scaleY;
    });

    const newPoints = getNewPoints(e, scaledPoints);

    setRadius(shape.radius() * scaleX);
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
    setPoints(getNewPoints(e, circle.points));
  }

  function handleDragEnd() {
    dispatch(
      updateWithObject({
        ...circle,
        points: points,
      })
    );
  }

  if (!points.length) return;

  return (
    <>
      {/* Border */}
      <CircleKonva
        listening={false}
        x={(points[0] + points[2]) / 2}
        y={(points[1] + points[3]) / 2}
        radius={radius}
        stroke={themes.shapeBorder}
        strokeWidth={circle.strokeWidth * themes.shapeBorderSize}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* Shape */}
      <CircleKonva
        id={circle.id}
        ref={shapeRef}
        x={(points[0] + points[2]) / 2}
        y={(points[1] + points[3]) / 2}
        radius={radius}
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransform={handleTransform}
        onTransformEnd={handleTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onTap={onSelect}
        onClick={onSelect}
        hitStrokeWidth={circle.strokeWidth * HIT_DETECTION_MULTIPLIER}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
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
