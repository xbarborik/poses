import { useEffect, useRef, useState } from "react";
import { Circle, Group, Line, Rect } from "react-konva";
import { useDispatch, useSelector } from "react-redux";
import { getStageScale, setIsDragging } from "../canvas/canvasSlice";
import { circleHitFunc } from "../../hit_functions/circleHitFunction";
import { ANCHOR_SHADOW_WIDTH } from "../../utils/constants";

function LineTransformer({
  children,
  show,
  points,
  setPoints,
  isDraggable,
  onTransformEnd,
  onDragEnd,
  onRemove,
}) {
  const dispatch = useDispatch();
  const groupRef = useRef();
  const anchor1Ref = useRef();
  const anchor2Ref = useRef();
  const stageScale = useSelector(getStageScale);
  const [anchorOffset, setAnchorOffset] = useState({ x: 0, y: 0 });

  const [groupBounds, setGroupBounds] = useState({
    x: null,
    y: null,
    width: null,
    height: null,
  });

  const anchorScale = stageScale / 0.9;
  const anchorSize = 16 / anchorScale;
  const anchorOffsetDistance = 40 / anchorScale; // distance from line object

  useEffect(() => {
    groupRef.current.moveToTop();
  }, [show]);

  useEffect(() => {
    function findNewAnchorPoint() {
      const dx = points[2] - points[0];
      const dy = points[3] - points[1];
      const length = Math.sqrt(dx * dx + dy * dy);
      if (length === 0) return { x: points[0], y: points[1] };
      //console.log(length);

      const directionX = dx / length;
      const directionY = dy / length;

      const offsetX = directionX * anchorOffsetDistance;
      const offsetY = directionY * anchorOffsetDistance;

      setAnchorOffset({ x: offsetX, y: offsetY });
      // setGroupBounds(groupRef?.current?.getClientRect())
    }

    findNewAnchorPoint();
  }, [points, anchorOffsetDistance]);

  function handleAnchorDragMove() {
    const newPoints = [
      anchor1Ref.current.x() + anchorOffset.x,
      anchor1Ref.current.y() + anchorOffset.y,
      anchor2Ref.current.x() - anchorOffset.x,
      anchor2Ref.current.y() - anchorOffset.y,
    ];
    setPoints(newPoints);
  }

  function handleAnchorDragEnd() {
    onTransformEnd(points);
  }

  function handleGroupDragStart() {
    dispatch(setIsDragging(true));
  }

  // Update line when group is dragged
  function handleGroupDragEnd() {
    const [x1, y1, x2, y2] = points;
    const { x: xOffset, y: yOffset } = groupRef.current.getPosition();

    const newPoints = [x1 + xOffset, y1 + yOffset, x2 + xOffset, y2 + yOffset];

    setPoints(newPoints);
    onDragEnd(newPoints);
    dispatch(setIsDragging(false));

    // Reset group origin position
    groupRef.current.position({ x: 0, y: 0 });
  }

  return (
    <Group
      ref={groupRef}
      draggable={isDraggable}
      onDragStart={handleGroupDragStart}
      onDragEnd={(e) => handleGroupDragEnd(e)}
    >
      {children}

      {groupBounds?.x && (
        <Rect
          x={groupBounds.x}
          y={groupBounds.y}
          width={groupBounds.width}
          height={groupBounds.height}
          stroke="blue" // Color of the border
          strokeWidth={2} // Width of the border
        />
      )}

      {show && (
        <>
          {/* Anchors */}
          <Circle
            ref={anchor1Ref}
            name="anchor"
            x={points[0] - anchorOffset.x}
            y={points[1] - anchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={ANCHOR_SHADOW_WIDTH / anchorScale} // border width
            stroke="#b5b5b5" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            // onDragEnd={(e) => handleAnchorDragEnd(e)}
            hitFunc={circleHitFunc}
            // opacity={showAnchors}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "default";
            }}
          />

          <Circle
            ref={anchor2Ref}
            name="anchor"
            x={points[2] + anchorOffset.x}
            y={points[3] + anchorOffset.y}
            radius={anchorSize}
            fill="white"
            strokeWidth={ANCHOR_SHADOW_WIDTH / anchorScale} // border width
            stroke="#b5b5b5" // border color
            draggable
            onDragMove={(e) => handleAnchorDragMove(e)}
            // onDragEnd={(e) => handleAnchorDragEnd(e)}
            hitFunc={circleHitFunc}
            // opacity={showAnchors}
            onMouseEnter={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "pointer";
            }}
            onMouseLeave={(e) => {
              const container = e.target.getStage().container();
              container.style.cursor = "default";
            }}
          />
        </>
      )}
    </Group>
  );
}

export default LineTransformer;
