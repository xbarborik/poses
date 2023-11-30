import { useEffect, useRef } from "react";
import { Arrow as ArrowKonva } from "react-konva";
import { useDispatch } from "react-redux";
import CustomTransformer from "../../ui/CustomTransformer";
import { hitDetectionMultiplier } from "../../utils/constants";
import LineTransformer from "../../ui/LineTransformer";

function Arrow({ arrow, isDraggable, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();

  // Following commented code is for modifying the transformer for lines
  // useEffect(() => {
  //   const angle = Math.atan2(
  //     arrow.points[3] - arrow.points[1],
  //     arrow.points[2] - arrow.points[0]
  //   );
  //   const angleInDegrees = (angle * 180) / Math.PI;

  //   if (isSelected) {
  //     // we need to attach transformer manually
  //     trRef.current.nodes([shapeRef.current]);
  //     trRef.current.getLayer().batchDraw();
  //     // trRef.current.rotation(angleInDegrees);
  //   }
  // }, [isSelected, arrow.points]);

  // useEffect(() => {
  //   const widthPad = (arrow.points[2] - arrow.points[0]) / 4;
  //   const heightPad = 0;

  //   shapeRef.current.getSelfRect = () => {
  //     const ret = {
  //       x: arrow.points[0],
  //       y: arrow.points[1] + (arrow.points[1] - arrow.points[3]) / 2,
  //       width: arrow.points[2] - arrow.points[0],
  //       height: arrow.points[3] - arrow.points[1],
  //     };
  //     return ret;
  //   };
  // }, [arrow.points]);

  function handleTransformEnd(newPoints) {
    onChange({ ...arrow, points: newPoints });
  }

  function handleDragEnd(newPoints) {
    onChange({ ...arrow, points: newPoints });
  }

  return (
    <LineTransformer
      show={isSelected}
      line={arrow}
      isDraggable={isDraggable}
      onTransformEnd={handleTransformEnd}
      onDragEnd={handleDragEnd}
    >
      <ArrowKonva
        id={arrow.id}
        onClick={onSelect}
        onTouchStart={onSelect}
        points={arrow.points}
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
      />
    </LineTransformer>
    // {isSelected && (
    //   <CustomTransformer trRef={trRef} objectId={arrow.id} rotation={200} />
    // )}
  );
}

export default Arrow;
