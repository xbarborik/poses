import { useEffect, useState } from "react";
import { Arrow as ArrowKonva } from "react-konva";
import { useDispatch } from "react-redux";
import {
  ARROW_POINTER_SCALE,
  HIT_DETECTION_MULTIPLIER,
} from "../../utils/constants";
import LineTransformer from "../transformers/LineTransformer";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import useAdjustColorAndWidth from "../stylePanel/useAdjustColorAndWidth";
import CustomArrow from "../customShapes/CustomArrow";

function Arrow({ arrow, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([]);

  useAdjustColorAndWidth(arrow, isSelected);

  useEffect(() => {
    setPoints(arrow.points);
  }, [arrow.points]);

  function handleChangeEnd(newPoints) {
    dispatch(updateHistory());
    dispatch(updateWithObject({ ...arrow, points: newPoints }));
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
      onRemove={() => dispatch(removeObject(arrow.id))}
    >
      <CustomArrow
        objectId={arrow.id}
        points={points}
        stroke={arrow.color}
        strokeWidth={arrow.strokeWidth}
        fill={arrow.color}
        lineCap="round"
        pointerLength={2 * arrow.strokeWidth}
        pointerWidth={2 * arrow.strokeWidth * ARROW_POINTER_SCALE}
        hitStrokeWidth={arrow.strokeWidth * HIT_DETECTION_MULTIPLIER}
        onTap={onSelect}
        onClick={onSelect}
        pointerAtBeginning={true}
      />
    </LineTransformer>
  );
}

export default Arrow;
