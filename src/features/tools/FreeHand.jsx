import { Line } from "react-konva";
import { hitDetectionMultiplier } from "../../utils/constants";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import CustomTransformer from "../../ui/CustomTransformer";
import { getNewPoints } from "./freeHandUtils";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";

function FreeHand({ line, isDraggable, isSelected, onSelect }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([0, 0, 0, 0]);

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

    node.scaleX(1);
    node.scaleY(1);

    const scaledPoints = points.map((value) => value * scaleX);

    setPoints(getNewPoints(e, scaledPoints));

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
    const offset = e.target.position();

    const newPoints = line.points.map((value, i) =>
      i % 2 == 0 ? value + offset.x : value + offset.y
    );

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

  return (
    <>
      <Line
        id={line.id}
        ref={shapeRef}
        points={points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
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
        onDragEnd={handleDragEnd}
        strokeScaleEnabled={false}
        hitStrokeWidth={line.strokeWidth * hitDetectionMultiplier}
        onTap={(e) => onSelect(e)}
        onClick={(e) => onSelect(e)}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={line.id}
          centeredScaling={false}
          onRemove={() => dispatch(removeObject(line.id))}
        />
      )}
    </>
  );
}

export default FreeHand;
