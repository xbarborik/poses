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
      radius: node.radius() * scaleX * 2,
    };

    onChange(newCircle);
  }

  function handleDragEnd(e) {
    const pos = e.target.position(); // center

    onChange({
      ...circle,
      points: [pos.x, pos.y, pos.x, pos.y], // dragging is centered for circles in Konva
    });
  }

  return (
    <>
      <CircleKonva
        id={circle.id}
        ref={shapeRef}
        x={(circle.points[0] + circle.points[2]) / 2 || 0}
        y={(circle.points[1] + circle.points[3]) / 2 || 0}
        radius={circle.radius / 2}
        stroke={circle.color}
        strokeWidth={circle.strokeWidth}
        strokeScaleEnabled={false}
        onTap={onSelect}
        onClick={onSelect}
        draggable={isDraggable}
        onTransformStart={() => dispatch(updateHistory())}
        onTransformEnd={onTransformEnd}
        onDragStart={() => dispatch(updateHistory())}
        onDragEnd={(e) => handleDragEnd(e)}
      />
      {isSelected && (
        <CustomTransformer
          trRef={trRef}
          objectId={circle.id}
          centeredScaling={false}
          isVisible={isSelected}
        />
      )}
    </>
  );
}

export default Circle;
