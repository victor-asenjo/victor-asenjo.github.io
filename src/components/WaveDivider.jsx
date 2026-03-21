// src/components/WaveDivider.jsx
import React from "react";

/**
 * SVG section divider.
 * Place at the BOTTOM of the "from" section.
 * fill = background color of the NEXT section.
 * variant = shape style (wave | tilt | wave-r | peaks | curve)
 */
const PATHS = {
  // Gentle rolling wave (default)
  wave:   "M0 0L60 10C120 20 240 40 360 46C480 52 600 46 720 38C840 30 960 18 1080 14C1200 10 1320 14 1380 16L1440 18V64H0V0Z",
  // Clean diagonal cut left-to-right
  tilt:   "M0 0L1440 52V64H0V0Z",
  // Wave travelling the opposite direction
  "wave-r": "M0 46L60 42C120 38 240 30 360 22C480 14 600 6 720 8C840 10 960 20 1080 30C1200 40 1320 50 1380 54L1440 58V64H0V46Z",
  // Triple mountain peaks
  peaks:  "M0 64V44L240 18L480 44L720 10L960 44L1200 18L1440 44V64H0Z",
  // Smooth concave curve
  curve:  "M0 40C360 72 1080 0 1440 36V64H0V40Z",
};

const WaveDivider = ({ fill, variant = "wave" }) => (
  <svg
    className="wave-divider"
    viewBox="0 0 1440 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d={PATHS[variant] || PATHS.wave} fill={fill} />
  </svg>
);

export default WaveDivider;
