import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

// https://deadsimplechat.com/blog/react-slider-rc-slider-step-by-step-tutorial-with-examples/
const trackHeightScale = 0.5;

function CustomSlider({
  value,
  onChange,
  minValue = 0,
  maxValue = 0,
  color = "blue",
}) {
  const styles = {
    handle: {
      backgroundColor: color,
      opacity: 1,
      outline: `2px solid rgba(255,255,255,0.3)`,
      border: "none",
      cursor: "pointer",
      height: value * 1.5,
      width: value * 1.5,
      top: minValue * trackHeightScale ** 2,
      bottom: 0,
      margin: "auto 0",
      zIndex: 1,
      boxShadow: "none !important",
      touchAction: "none",
      "::focus": {
        outline: "none",
        boxShadow: "none !important",
      },
    },

    track: {
      backgroundColor: color,
      opacity: 0.5,
      height: minValue * trackHeightScale,
    },

    rail: {
      backgroundColor: "rgba(255,255,255,0.4)",
      height: minValue * trackHeightScale,
    },
  };

  return (
    <Slider
      onChange={onChange}
      defaultValue={value || minValue}
      min={minValue}
      max={maxValue}
      styles={styles}
    />
  );
}

export default CustomSlider;
