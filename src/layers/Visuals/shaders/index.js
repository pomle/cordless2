import React, { Component } from 'react';
import { Shaders, Node, GLSL } from 'gl-react';
import { timed } from '../timed.jsx';

const shaders = Shaders.create({
  helloBlue: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform float blue;
void main() {
  gl_FragColor = vec4(uv.x / 2.0, uv.y, blue, 1.0);
}`,
  },
  DiamondCrop: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main() {
gl_FragColor = mix(
  texture2D(t, uv),
  texture2D(t, uv*2.0),
  step(0.5, abs(uv.x - 0.5) + abs(uv.y - 0.5))
);
}
`,
  },
  animated: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float time, amp, freq, colorSeparation, moving;
vec2 lookup (vec2 offset) {
  return mod(
    uv + amp * vec2(
        cos(freq*(uv.x+offset.x)+time/1000.0),
        sin(freq*(uv.y+offset.x)+time/1000.0))
      + vec2( moving * time/10000.0, 0.0),
    vec2(1.0));
}
void main() {
  vec3 col =  mix(vec3(
    texture2D(t, lookup(vec2(colorSeparation))).r,
    texture2D(t, lookup(vec2(-colorSeparation))).g,
    texture2D(t, lookup(vec2(0.0))).b),  vec3(1.0), 0.1);
  gl_FragColor = vec4(col * vec3(
    0.5 + 0.5 * cos(uv.y + uv.x * 49.0),
    0.6 * uv.x + 0.2 * sin(uv.y * 30.0),
    1.0 - uv.x + 0.5 * cos(uv.y * 2.0)
  ), 1.0);
}
`,
  },
  eities: {
    frag: GLSL`
precision highp float;
varying vec2 uv;

uniform float time;

void main() {
  float amnt;
  float nd;
  vec4 cbuff = vec4(0.0);
  for(float i=0.0; i<5.0;i++){
    nd = sin(3.17*0.8*uv.x + (i*0.1+sin(+time)*0.2) + time)*0.8+0.1 + uv.x;
    amnt = 1.0/abs(nd-uv.y)*0.01;
    cbuff += vec4(amnt, amnt*0.3 , amnt*uv.y, 90.0);
  }
  for(float i=0.0; i<1.0;i++){
    nd = sin(3.14*2.0*uv.y + i*40.5 + time)*90.3*(uv.y+80.3)+0.5;
    amnt = 1.0/abs(nd-uv.x)*0.015;
    cbuff += vec4(amnt*0.2, amnt*0.2 , amnt*uv.x, 1.0);
  }
  gl_FragColor = cbuff;
}
`,
  },
  pontus: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float time;

void main() {
  float amnt;
  float nd;
  vec4 cbuff = vec4(0.0);
  for(float i=0.0; i<10.0;i++){
    nd = sin(3.17*0.8*uv.x + (i*0.2+sin(+time)*0.3) + time)*0.8+0.1 + uv.x;
    amnt = 0.5/abs(nd-uv.y)*0.05;
    cbuff += vec4(amnt*0.5, 0.0, amnt*uv.y, 1.0);
  }
  for(float i=0.0; i<1.0;i++){
    nd = sin(3.14*2.0*uv.y + i*40.5 + time)*90.3*(uv.y+80.3)+0.5;
    amnt = 1.0/abs(nd-uv.x)*0.015;
    cbuff += vec4(amnt*0.2, amnt*0.2 , 0.1+amnt*uv.x, 1.0);
  }

  gl_FragColor = mix(
    cbuff,
    texture2D(t, uv*1.0),

    0.5);
}
`,
  },
});

export const HelloBlue = timed(({ time }) => {
  return <Node shader={shaders.helloBlue} uniforms={{ time: time / 1000 }} />;
});

export const Pontus = timed(({ time, children: t }) => (
  <Node
    shader={shaders.pontus}
    uniforms={{
      t,
      time: time / 5000,
    }}
  />
));

export const DiamondCrop = ({ children: t }) => (
  <Node shader={shaders.DiamondCrop} uniforms={{ t }} />
);

class Animated extends Component {
  render() {
    const { children: t, time } = this.props;
    return (
      <Node
        shader={shaders.animated}
        uniforms={{
          t,
          time,
          freq: 20 - 14 * Math.sin(time / 7000),
          amp: 0.05 * (1 - Math.cos(time / 4000)),
          colorSeparation: 0.02,
          moving: 1,
        }}
      />
    );
  }
}

export const AnimatedLoop = timed(Animated);
