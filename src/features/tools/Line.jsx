import { Line as LineKonva } from "react-konva";
import LineTransformer from "../transformers/LineTransformer";
import { HIT_DETECTION_MULTIPLIER } from "../../utils/constants";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Line({ line, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);

  useAdjustColorAndWidth(line, isSelected);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  useEffect(() => {
    //console.log(JSON.stringify(points));
  }, [points]);

  function handleChangeEnd(newPoints) {
    dispatch(updateHistory());
    dispatch(updateWithObject({ ...line, points: newPoints }));
  }

  if (!points.length) return;

  return (
    <LineTransformer
      show={isSelected}
      points={points}
      setPoints={setPoints}
      isDraggable={isDraggable}
      onTransformEnd={handleChangeEnd}
      onDragEnd={handleChangeEnd}
      onRemove={() => dispatch(removeObject(line.id))}
    >
      <LineKonva
        id={line.id}
        points={points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        onTap={onSelect}
        onClick={onSelect}
      />
    </LineTransformer>
  );
}

export default Line;
