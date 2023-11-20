import { Image } from "react-konva";
import useImage from "use-image";

import warrior from "/images/warrior.png";

function PoseImage() {
  const [image] = useImage(warrior);
  return <Image image={image} />;
}

export default PoseImage;
