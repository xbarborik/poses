import { Transformer } from "react-konva";
import { IoCloseOutline } from "react-icons/io5";
import Button from "./Button";
import { Html } from "react-konva-utils";
import { useDispatch } from "react-redux";
import { removeObject } from "../features/canvas/canvasSlice";

function CustomTransformer({ trRef, id }) {
  const dispatch = useDispatch();

  return (
    <>
      <Html>
        <Button onCLick={() => dispatch(removeObject(id))}>
          <IoCloseOutline />
        </Button>
      </Html>
      <Transformer
        ref={trRef}
        flipEnabled={false}
        centeredScaling={true}
        enabledAnchors={["bottom-right"]}
        rotateEnabled={false}
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </>
  );
}

export default CustomTransformer;
