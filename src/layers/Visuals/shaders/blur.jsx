import React, { Component } from "react";
import {Shaders, Node, GLSL, connectSize} from "gl-react";
import { Surface } from "gl-react-dom";

const shaders = Shaders.create({
  blur1D: { // blur9: from https://github.com/Jam3/glsl-fast-gaussian-blur
   frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform vec2 direction, resolution;
vec4 blur9(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
  vec4 color = vec4(0.0);
  vec2 off1 = vec2(1.3846153846) * direction;
  vec2 off2 = vec2(3.2307692308) * direction;
  color += texture2D(image, uv) * 0.2270270270;
  color += texture2D(image, uv + (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv - (off1 / resolution)) * 0.3162162162;
  color += texture2D(image, uv + (off2 / resolution)) * 0.0702702703;
  color += texture2D(image, uv - (off2 / resolution)) * 0.0702702703;
  return color;
}
void main() {
  gl_FragColor = blur9(t, uv, resolution, direction);
}
` }
});

// This implements a blur on a single direction (x or y axis for instance)
// connectSize will inject for us the width/height from context if not provided
export const Blur1D =
  connectSize(({ children: t, direction, width, height }) =>
    <Node
      shader={shaders.blur1D}
      uniforms={{ t, resolution: [ width, height ], direction }}
    />);

// BlurXY is a basic blur that apply Blur1D on Y and then on X
export const BlurXY =
  connectSize(({ factor, children }) =>
    <Blur1D direction={[ factor, 0 ]}>
      <Blur1D direction={[ 0, factor ]}>
        {children}
      </Blur1D>
    </Blur1D>);

// empirical strategy to chose a 2d vector for a blur pass
const NORM = Math.sqrt(2)/2;
export const directionForPass = (p: number, factor: number, total: number) => {
  const f = factor * 2 * Math.ceil(p / 2) / total;
  switch ((p-1) % 4) { // alternate horizontal, vertical and 2 diagonals
  case 0: return [f,0];
  case 1: return [0,f];
  case 2: return [f*NORM,f*NORM];
  default: return [f*NORM,-f*NORM];
  }
}

// recursively apply Blur1D to make a multi pass Blur component
export const BetterBlur = connectSize(({ children, factor, passes }) => {
  const rec = pass =>
    pass <= 0
    ? children
    : <Blur1D direction={directionForPass(pass, factor, passes)}>
        {rec(pass-1)}
      </Blur1D>;
  return rec(passes);
});
