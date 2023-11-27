import { useEffect, useRef } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../../ui/CustomTransformer";
import { useDispatch } from "react-redux";
import { updateHistory } from "../canvas/canvasSlice";

function Circle({ circle, isDraggable, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function onTransformEnd() {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    // const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const newCircle = {
      ...circle,
      radius: Math.max(5, node.radius() * scaleX),
    };

    onChange(newCircle);
  }

  function handleDragEnd(e) {
    const pos = e.target.position(); // topLeft

    onChange({ ...circle, points: [pos.x, pos.y] });
  }

  return (
    <>
      <CircleKonva
        id={circle.id}
        ref={shapeRef}
        x={circle.points[0] + circle.width}
        y={circle.points[1] - circle.height}
        radius={circle.radius}
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
        // width={circle.width}
        // height={circle.height}
        strokeScaleEnabled={false}
        onTouchStart={onSelect}
        onClick={onSelect}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransformEnd={onTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragEnd={(e) => handleDragEnd(e)}
      />
      {isSelected && <CustomTransformer trRef={trRef} objectId={circle.id} />}
    </>
  );
}

export default Circle;
