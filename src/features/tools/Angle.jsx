import { Line as LineKonva } from "react-konva";
import LineTransformer from "../../ui/LineTransformer";
import { HIT_DETECTION_MULTIPLIER } from "../../utils/constants";
import { removeObject, updateHistory } from "../canvas/canvasSlice";
import { useDispatch } from "react-redux";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Angle({ line, isDraggable, isSelected, onSelect, onChange }) {
  const dispatch = useDispatch();

  function handleChange(newPoints) {
    dispatch(updateHistory());
    onChange({ ...line, points: newPoints });
  }

  return (
    <LineTransformer
      show={isSelected}
      line={line}
      isDraggable={isDraggable}
      onTransformEnd={handleChange}
      onDragEnd={handleChange}
      onRemove={() => dispatch(removeObject(line.id))}
    >
      <LineKonva
        id={line.id}
        onClick={onSelect}
        onTap={onSelect}
        points={line.points}
        stroke={line.color}
        strokeWidth={line.strokeWidth}
        tension={0.7}
        lineCap="round"
        globalCompositeOperation={"source-over"}
        hitStrokeWidth={line.strokeWidth * HIT_DETECTION_MULTIPLIER}
      />
    </LineTransformer>
  );
}

export default Angle;
