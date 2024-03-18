import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useState } from "react";

// https://deadsimplechat.com/blog/react-slider-rc-slider-step-by-step-tutorial-with-examples/
const trackHeightScale = 2.5;

function calcOutline(value, maxValue) {
  const circleDiameter = value;
  const border = (maxValue - circleDiameter) / 2;

  return border;
}

function CustomSlider({
  value,
  onChange,
  minValue = 0,
  maxValue = 0,
  color = "blue",
  name,
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const scale = 1.8;
  const styles = {
    handle: {
      backgroundColor: color,
      opacity: 1,
      border: `${
        calcOutline(value, maxValue) * scale
      }px solid rgba(255,255,255,0.5)`,
      cursor: "pointer",
      boxShadow: "none",
      height: (value + calcOutline(value, maxValue) * 2) * scale,
      width: (value + calcOutline(value, maxValue) * 2) * scale,
      top: (minValue * trackHeightScale) / 2,
      boxSizing: "border-box",
      backgroundClip: "padding-box",
      bottom: 0,
      margin: "auto 0",
      zIndex: 1,
    },

    track: {
      backgroundColor: color,
      opacity: 0.5,
      height: minValue * trackHeightScale,
    },

    rail: {
      backgroundColor: "rgba(0,0,0,0.3)",
      height: minValue * trackHeightScale,
    },
  };

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <Slider
      name={name}
      onChange={onChange}
      value={currentValue || minValue}
      min={minValue}
      max={maxValue}
      styles={styles}
    />
  );
}

export default CustomSlider;
