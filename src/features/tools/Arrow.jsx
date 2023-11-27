import { useEffect, useRef } from "react";
import { Arrow as ArrowKonva } from "react-konva";
import { useDispatch } from "react-redux";
import CustomTransformer from "../../ui/CustomTransformer";

function Arrow({ arrow, isDraggable, onDragEnd, isSelected, onSelect }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const angle = Math.atan2(
      arrow.points[3] - arrow.points[1],
      arrow.points[2] - arrow.points[0]
    );
    const angleInDegrees = (angle * 180) / Math.PI;

    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
      trRef.current.rotation(angleInDegrees);
    }
  }, [isSelected, arrow.points]);

  useEffect(() => {
    const widthPad = (arrow.points[2] - arrow.points[0]) / 4;
    const heightPad = 0;

    shapeRef.current.getSelfRect = () => {
      const ret = {
        x: arrow.points[0],
        y: arrow.points[1] + (arrow.points[1] - arrow.points[3]) / 2,
        width: arrow.points[2] - arrow.points[0],
        height: arrow.points[3] - arrow.points[1],
      };
      return ret;
    };
  }, [arrow.points]);

  return (
    <>
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
        draggable={isDraggable}
        pointerLength={20}
        pointerWidth={20}
        onDragEnd={onDragEnd}
        ref={shapeRef}
      />
      {isSelected && <CustomTransformer trRef={trRef} objectId={arrow.id} />}
    </>
  );
}

export default Arrow;
