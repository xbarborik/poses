import { Line as LineKonva } from "react-konva";
import LineTransformer from "../transformers/LineTransformer";
import { HIT_DETECTION_MULTIPLIER, LOWERED_ALPHA } from "../../utils/constants";
import {
  getOpacityLowered,
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";
import { darkenColor } from "../../utils/helpers";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Line({ line, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);
  const isOpacityLowered = useSelector(getOpacityLowered);

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
        opacity={isOpacityLowered ? LOWERED_ALPHA : 1}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
        lineCap="round"
        onTap={onSelect}
        onClick={onSelect}
      />
    </LineTransformer>
  );
}

export default Line;
