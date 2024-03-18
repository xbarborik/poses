import { Line } from "react-konva";
import { HIT_DETECTION_MULTIPLIER, LOWERED_ALPHA } from "../../utils/constants";
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
import { darkenColor } from "../../utils/helpers";

function FreeHand({ line, isDraggable, isSelected, onSelect, stageRef }) {
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

    shapeRef.current.position({ x: 0, y: 0 });
  }

  function handleTransformEnd() {
    const newLine = {
      ...line,
      points: points,
    };

    dispatch(updateWithObject(newLine));
  }

  function handleDragEnd(e) {
    const newPoints = getNewPoints(e, line.points);
    setPoints(newPoints);
    shapeRef.current.position({ x: 0, y: 0 });

    dispatch(
      updateWithObject({
        ...line,
        points: newPoints,
      })
    );
  }

  if (!points.length) return;

  return (
    <>
      {/* <Line
        listening={false}
        ref={shapeRef}
        points={points}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={"black"}
        strokeWidth={line.strokeWidth * 1.5}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
      /> */}
      <Line
        id={line.id}
        ref={shapeRef}
        points={points}
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation={"source-over"}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransform={(e) => handleTransform(e)}
        onTransformEnd={handleTransformEnd}
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
        shadowColor={darkenColor(line.color, -14)}
        shadowBlur={5}
        shadowOpacity={1}
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

export default FreeHand;
