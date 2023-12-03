import { Line as LineKonva } from "react-konva";
import LineTransformer from "../../ui/LineTransformer";
import { hitDetectionMultiplier } from "../../utils/constants";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useAdjustColorAndWidth from "./useAdjustColorandWidth";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Line({ line, isDraggable, isSelected, onSelect }) {
  const dispatch = useDispatch();
  const [points, setPoints] = useState([0, 0, 0, 0]);

  useAdjustColorAndWidth(line, isSelected);

  useEffect(() => {
    setPoints(line.points);
  }, [line.points]);

  function handleChangeEnd(newPoints) {
    dispatch(updateHistory());
    dispatch(updateWithObject({ ...line, points: newPoints }));
  }

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
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        hitStrokeWidth={line.strokeWidth * hitDetectionMultiplier}
        onTap={(e) => onSelect(e)}
        onClick={(e) => onSelect(e)}
      />
    </LineTransformer>
  );
}

export default Line;
