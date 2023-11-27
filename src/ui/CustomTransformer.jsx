import { Group, Transformer } from "react-konva";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { Html } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { removeObject } from "../features/canvas/canvasSlice";

function CustomTransformer({ trRef, objectId }) {
  const dispatch = useDispatch();

  return (
    <Group>
      <Html>
        <Button onClick={() => dispatch(removeObject(objectId))} $color={"red"}>
          <IoCloseOutline />
        </Button>
      </Html>
      <Transformer
        ref={trRef}
        flipEnabled={false}
        centeredScaling={true}
        enabledAnchors={["bottom-right"]}
        rotateEnabled={false}
      />
    </Group>
  );
}

export default CustomTransformer;
