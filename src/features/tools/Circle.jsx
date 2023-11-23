import { useEffect, useRef } from "react";
import { Circle as CircleKonva } from "react-konva";
import CustomTransformer from "../../ui/CustomTransformer";

function Circle({ circle, isDraggable, isSelected, onSelect, onChange }) {
  const shapeRef = useRef();
  const trRef = useRef();

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

  // function onDelete() {
  //   dispatch(dele);
  // }

  return (
    <>
      <CircleKonva
        id={circle.id}
        onClick={onSelect}
        onTouchStart={onSelect}
        ref={shapeRef}
        x={circle.points[0] + circle.width}
        y={circle.points[1] - circle.height}
        // width={circle.width}
        // height={circle.height}
        strokeWidth={5}
        radius={circle.radius}
        stroke={circle.color}
        draggable={isDraggable}
        strokeScaleEnabled={false}
        onTransformEnd={onTransformEnd}
        onDragEnd={(e) => handleDragEnd(e)}
      />
      {isSelected && <CustomTransformer trRef={trRef} id={circle.id} />}
    </>
  );
}

export default Circle;
