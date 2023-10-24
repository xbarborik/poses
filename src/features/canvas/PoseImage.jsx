import { Image } from "react-konva";
import useImage from "use-image";

function PoseImage() {
  const [image] = useImage("/yoga/warrior.PNG");
  return <Image image={image} />;
}

export default PoseImage;
