import { Line as LineKonva } from "react-konva";
import LineTransformer from "../../ui/LineTransformer";
import { hitDetectionMultiplier } from "../../utils/constants";

// https://jsbin.com/wahetunepa/edit?html,js,output
function Line({ line, isDraggable, isSelected, onSelect, onChange }) {
  function handleTransformEnd(newPoints) {
    onChange({ ...line, points: newPoints });
  }

  function handleDragEnd(newPoints) {
    onChange({ ...line, points: newPoints });
  }

  return (
    <LineTransformer
      show={isSelected}
      line={line}
      isDraggable={isDraggable}
      onTransformEnd={handleTransformEnd}
      onDragEnd={handleDragEnd}
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
        hitStrokeWidth={line.strokeWidth * hitDetectionMultiplier}
      />
    </LineTransformer>
  );
}

export default Line;
