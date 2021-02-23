import React from "react";

const Noise = () => {
  return (
    <svg className="Noise">
      <defs>
        <pattern id="noisePattern">
          <filter id="noise">
            <feTurbulence
              baseFrequency="0.5"
              numOctaves="1"
              type="fractalNoise"
              stitchTiles="stitch"
            ></feTurbulence>
          </filter>
          <rect
            x="0"
            y="0"
            height="200"
            width="200"
            filter="url(#noise)"
          ></rect>
        </pattern>
      </defs>
      <rect
        x="0"
        y="0"
        height="100%"
        width="100%"
        filter="url(#noise)"
        fill="url(#noisePattern)"
      ></rect>
    </svg>
  );
};

export default Noise;
