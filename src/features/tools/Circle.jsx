import { useEffect, useRef } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../../ui/CustomTransformer";
import { useDispatch } from "react-redux";
import { removeObject, updateHistory } from "../canvas/canvasSlice";

function Circle({ circle, isDraggable, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  function handleTransformEnd() {
    const node = shapeRef.current;
    const scaleX = node.scaleX();
    //const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    const newCircle = {
      ...circle,
      radius: node.radius() * scaleX,
    };

    onChange(newCircle);
  }

  function handleDragEnd(e) {
    const pos = e.target.position(); // center

    onChange({ ...circle, points: [pos.x, pos.y] });
  }

  return (
    <>
      <CircleKonva
        id={circle.id}
        ref={shapeRef}
        x={circle.points[0]}
        y={circle.points[1]}
        radius={circle.radius}
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
        strokeScaleEnabled={false}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransformEnd={handleTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragEnd={(e) => handleDragEnd(e)}
        onTap={(e) => onSelect(e)}
        onClick={(e) => onSelect(e)}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          onRemove={() => dispatch(removeObject(circle.id))}
        />
      )}
    </>
  );
}

export default Circle;
