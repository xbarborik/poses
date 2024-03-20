import { useEffect } from "react";

function Gallery() {
  useEffect(() => {
    console.log("Gallery");
  }, []);
  return <>Hello</>;
}

export default Gallery;
