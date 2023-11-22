import { useEffect, useLayoutEffect, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

// import warrior from ;

function PoseImage({ dimensions }) {
  const [image] = useImage("/poses/images/" + "warrior.png");
  const [scaledDimensions, setScaledDimensions] = useState({
    dimensions,
  });

  useLayoutEffect(() => {
    function calcSize() {
      if (!image) return;

      const aspectRatio = image.width / image.height;
      console.log(dimensions);
      let scaledWidth = dimensions.width;
      let scaledHeight = dimensions.width / aspectRatio;

      if (scaledHeight > dimensions.height) {
        scaledHeight = dimensions.height;
        scaledWidth = dimensions.height * aspectRatio;
      }

      setScaledDimensions({ width: scaledWidth, height: scaledHeight });
    }

    calcSize();
  }, [image, dimensions]);

  return (
    <Image
      image={image}
      x={dimensions.width / 2 - scaledDimensions.width / 2 || 0}
      y={dimensions.height / 2 - scaledDimensions.height / 2 || 0}
      width={scaledDimensions.width}
      height={scaledDimensions.height}
    />
  );
}

export default PoseImage;
