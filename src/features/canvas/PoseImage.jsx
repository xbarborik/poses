import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { useSelector } from "react-redux";
import useImage from "use-image";
import { getCurrentImage } from "./canvasSlice";

function PoseImage({ dimensions, setImageSize }) {
  const imageData = useSelector(getCurrentImage);
  // const [image] = useImage("/poses/images/" + imageData?.path);
  const [image, setImage] = useState(null);
  // const [image] = useImage(imageData?.path);
  const [scaledDimensions, setScaledDimensions] = useState({
    dimensions,
  });

  useEffect(() => {
    if (imageData?.path) {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imageData.path;
      img.onload = () => {
        setImage(img);
      };
    }
  }, [imageData]);

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

      const newSize = { width: scaledWidth, height: scaledHeight };
      setScaledDimensions(newSize);
      setImageSize(newSize);
    }

    calcSize();
  }, [image, dimensions, setImageSize]);

  return (
    <Image
      imageRef
      image={image}
      x={dimensions.width / 2 - scaledDimensions.width / 2}
      y={dimensions.height / 2 - scaledDimensions.height / 2}
      width={scaledDimensions.width}
      height={scaledDimensions.height}
      listening={false}
      name="poseImage"
      // preventDefault={false} set false to allow scroll/zoom
    />
  );
}

export default PoseImage;
