import { Transformer } from "react-konva";

function CustomTransformer({ trRef }) {
  return (
    <>
      <Transformer
        ref={trRef}
        flipEnabled={false}
        centeredScaling={true}
        // enabledAnchors={["bottom-right"]}
        // rotateEnabled={false}
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
