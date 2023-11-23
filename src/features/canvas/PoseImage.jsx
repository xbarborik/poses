import { useEffect, useLayoutEffect, useState } from "react";
import { Image } from "react-konva";
import useImage from "use-image";

// import warrior from ;

function PoseImage({ dimensions, imagePath }) {
  const [image] = useImage("/poses/images/" + imagePath);
  const [scaledDimensions, setScaledDimensions] = useState({
    dimensions,
  });

  useEffect(() => {
    function calcSize() {
      if (!image) return;

      const aspectRatio = image.width / image.height;

      let scaledWidth = dimensions.width;
      let scaledHeight = dimensions.width / aspectRatio;

      if (scaledHeight > dimensions.height) {
        scaledHeight = dimensions.height;
        scaledWidth = dimensions.height * aspectRatio;
      }
      console.log(imagePath);
      setScaledDimensions({ width: scaledWidth, height: scaledHeight });
    }

    console.log(imagePath);
    calcSize();
  }, [image, dimensions, imagePath]);

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
