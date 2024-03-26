import { Arrow, Group, Line } from "react-konva";
import {
  ARROW_POINTER_SCALE,
  HIT_DETECTION_MULTIPLIER,
  LOWERED_ALPHA,
  MINIMUM_OBJECT_LENGTH,
} from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomTransformer from "../transformers/CustomTransformer";
import { getNewPoints } from "./freeHandUtils";
import {
  getOpacityLowered,
  removeObject,
  setIsDragging,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";
import CustomArrow from "../customShapes/CustomArrow";
import { themes } from "../../utils/themes";

function FreeHandArrow({ line, isDraggable, isSelected, onSelect, stageRef }) {
  const shapeRef = useRef();
  // const trRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const isOpacityLowered = useSelector(getOpacityLowered);

  useAdjustColorAndWidth(line, isSelected);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  // useEffect(() => {
  //   if (isSelected) {
  //     trRef.current.nodes([shapeRef.current]);
  //     trRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);

  // https://stackoverflow.com/questions/61048076/how-to-get-new-points-of-line-after-transformation-in-konvajs
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

    setPoints(newPoints);
    // shapeRef.current.points(newPoints);
    // shapeRef.current.getLayer().batchDraw();

    shapeRef.current.position({ x: 0, y: 0 });
  }

  function handleTransformEnd() {
    const newLine = {
      ...line,
      points: points,
    };

    dispatch(updateWithObject(newLine));
  }

  function handleDragMove(e) {
    const newPoints = getNewPoints(e, line.points);

    setPoints(newPoints);

    shapeRef.current.position({ x: 0, y: 0 });
  }

  function handleDragEnd() {
    dispatch(
      updateWithObject({
        ...line,
        points: points,
      })
    );
  }

  if (!points.length) return;

  const [lastX, lastY] = points.slice(-2);
  const prevX = points[points.length - 8];
  const prevY = points[points.length - 7];

  const arrowHeadPoints = [prevX, prevY, lastX, lastY];
  return (
    <>
      {/* Border */}
      <CustomArrow
        points={arrowHeadPoints}
        stroke={themes.shapeBorder}
        fill={line.color}
        strokeWidth={line.strokeWidth * 0.9 * themes.shapeBorderSize}
        pointerWidth={line.strokeWidth * 2 * ARROW_POINTER_SCALE}
        pointerLength={line.strokeWidth * 2}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        listening={false}
      />

      <Line
        listening={false}
        points={points}
        stroke={themes.shapeBorder}
        strokeWidth={line.strokeWidth * themes.shapeBorderSize}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* Shape */}
      <CustomArrow
        points={arrowHeadPoints}
        stroke={line.color}
        fill={line.color}
        strokeWidth={line.strokeWidth * 0.9}
        pointerWidth={line.strokeWidth * 2 * ARROW_POINTER_SCALE}
        pointerLength={line.strokeWidth * 2}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      <Line
        id={line.id}
        ref={shapeRef}
        points={points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation={"source-over"}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransform={handleTransform}
        onTransformEnd={handleTransformEnd}
        onDragMove={handleDragMove}
        onDragStart={() => {
          dispatch(updateHistory());
          dispatch(setIsDragging(true));
        }}
        onDragEnd={(e) => {
          handleDragEnd(e);
          dispatch(setIsDragging(false));
        }}
        onTap={onSelect}
        onClick={onSelect}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
      />

      {/* {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={line.id}
          centeredScaling={false}
          onRemove={() => dispatch(removeObject(line.id))}
          stageRef={stageRef}
        />
      )} */}
    </>
  );
}

export default FreeHandArrow;
