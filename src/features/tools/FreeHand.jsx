import { Line } from "react-konva";
import { HIT_DETECTION_MULTIPLIER } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CustomTransformer from "../transformers/CustomTransformer";
import { getNewPoints } from "./freeHandUtils";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import useAdjustColorAndWidth from "./useAdjustColorandWidth";

function FreeHand({ line, isDraggable, isSelected, onSelect, stageRef }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);

  useAdjustColorAndWidth(line, isSelected);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

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
    console.log("freehand", points[0], points[1]);
  }

  if (!points.length) return;

  return (
    <>
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
        onTransform={(e) => handleTransform(e)}
        onTransformEnd={handleTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragMove={(e) => handleDragMove(e)}
        onDragEnd={(e) => handleDragEnd(e)}
        onTap={(e) => onSelect(e)}
        onClick={(e) => onSelect(e)}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={line.id}
          centeredScaling={false}
          onRemove={() => dispatch(removeObject(line.id))}
          keepRatio={false}
          stageRef={stageRef}
        />
      )}
    </>
  );
}

export default FreeHand;
