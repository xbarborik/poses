import { useEffect, useState } from "react";

//https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
function useDimensions(ref) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: (ref && ref.current.offsetWidth) || 0,
      height: (ref && ref.current.offsetHeight) || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (ref.current) {
      setDimensions(getDimensions());
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref]);

  return dimensions;
}

export { useDimensions };
