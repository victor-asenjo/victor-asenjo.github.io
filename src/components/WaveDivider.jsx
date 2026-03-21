// src/components/WaveDivider.jsx
import React from "react";

/**
 * SVG wave divider between sections.
 * Place at the BOTTOM of the "from" section.
 * fill = background color of the NEXT section.
 */
const WaveDivider = ({ fill }) => (
  <svg
    className="wave-divider"
    viewBox="0 0 1440 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M0 0L60 10C120 20 240 40 360 46C480 52 600 46 720 38C840 30 960 18 1080 14C1200 10 1320 14 1380 16L1440 18V64H0V0Z"
      fill={fill}
    />
  </svg>
);

export default WaveDivider;
