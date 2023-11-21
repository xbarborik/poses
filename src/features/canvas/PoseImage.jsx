import { Image } from "react-konva";
import useImage from "use-image";

// import warrior from ;

function PoseImage() {
  const [image] = useImage("/poses/images/warrior.png");
  return <Image image={image} />;
}

export default PoseImage;
