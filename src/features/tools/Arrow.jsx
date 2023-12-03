import { useEffect, useRef, useState } from "react";
import { Arrow as ArrowKonva } from "react-konva";
import { useDispatch } from "react-redux";
import CustomTransformer from "../../ui/CustomTransformer";
import { hitDetectionMultiplier } from "../../utils/constants";
import LineTransformer from "../../ui/LineTransformer";
import {
  removeObject,
  updateHistory,
  updateWithObject,
} from "../canvas/canvasSlice";

function Arrow({ arrow, isDraggable, isSelected, onSelect }) {
  const shapeRef = useRef();
  const dispatch = useDispatch();
  const [points, setPoints] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setPoints(arrow.points);
  }, [arrow.points]);

  function handleChangeEnd(newPoints) {
    dispatch(updateHistory());
    dispatch(updateWithObject({ ...arrow, points: newPoints }));
  }

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
      <ArrowKonva
        id={arrow.id}
        points={points}
        stroke={arrow.color}
        strokeWidth={arrow.strokeWidth}
        fill={arrow.color}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        pointerLength={20}
        pointerWidth={20}
        hitStrokeWidth={arrow.strokeWidth * hitDetectionMultiplier}
        ref={shapeRef}
        onTouchStart={(e) => onSelect(e)}
        onMouseDown={(e) => onSelect(e)}
      />
    </LineTransformer>
    // {isSelected && (
    //   <CustomTransformer trRef={trRef} objectId={arrow.id} rotation={200} />
    // )}
  );
}

export default Arrow;
