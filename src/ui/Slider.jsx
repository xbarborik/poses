import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

// https://deadsimplechat.com/blog/react-slider-rc-slider-step-by-step-tutorial-with-examples/
const trackHeightScale = 0.9;

function calcOutline(value, minValue, maxValue) {
  const ratio = (maxValue - value) / maxValue;
  const outlineWidth = maxValue * ratio;

  return outlineWidth;
}

function CustomSlider({
  value,
  onChange,
  minValue = 0,
  maxValue = 0,
  color = "blue",
}) {
  const scale = 1.2;

  const styles = {
    handle: {
      backgroundColor: color,
      opacity: 1,
      outline: `${calcOutline(
        value,
        minValue,
        maxValue,
        scale
      )}px solid rgba(255,255,255,0.3)`,
      cursor: "pointer",
      border: "none",
      boxShadow: "none",
      boxSizing: "border-box",
      height: value * scale,
      width: value * scale,
      top: (minValue / 2) * trackHeightScale ** 2,
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
