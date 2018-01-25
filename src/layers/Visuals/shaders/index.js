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
  shrink: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
void main() {
  gl_FragColor = texture2D(t, uv.x * 0.9);
}
`,
    vert: GLSL`
attribute vec4 a_position;

void main() {
   gl_Position = a_position;
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
  pontus: {
    frag: GLSL`
precision mediump float;
varying vec2 uv;
uniform sampler2D t;
uniform float intensity;
uniform float progress;
uniform float thickness;
uniform float spacing;
uniform float effectMix;

void main() {
  float yOffset = 0.1;
  vec4 sourceColor = texture2D(t, uv);
  vec4 colorBuffer = vec4(0.0);

  float amnt;
  float nd;

  for(float i = 0.0; i < 10.0; i++) {
    nd = sin(2.536 * uv.x + (i * spacing + sin(progress) * 0.3) + progress) * 0.8 + yOffset + uv.x;
    amnt = thickness / abs(nd - uv.y) * 0.05;
    colorBuffer += vec4(amnt * 0.5, 0.0, amnt, 1.0);
  }

  /*for(float i = 0.0; i < 1.0; i++) {
    nd = sin(3.14 * 2.0 * uv.y + i * 40.5 + progress) * 90.3 * (uv.y + 80.3) + 0.5;
    amnt = 1.0 / abs(nd - uv.x) * 0.015;
    colorBuffer += vec4(amnt*0.2, amnt*0.2 , 0.1+amnt*uv.x, 1.0);
  }*/

  gl_FragColor = mix(
    max(colorBuffer * effectMix, sourceColor),
    sourceColor,
    effectMix);
}
`,
  },

  mood: {
    frag: GLSL`
precision mediump float;
varying vec2 uv;
uniform sampler2D t;
uniform vec3 color1;
uniform vec3 color2;
uniform vec3 color3;
uniform float colorMix;

void main() {
  vec4 sourceColor = texture2D(t, uv);

  gl_FragColor = mix(
    mix(vec4(mix(color1, color2, uv.x), 1.0), vec4(color3, 1.0), uv.y),
    sourceColor,
    colorMix);
}
`,
  },
});

function createFade(initial) {
  let last = initial;
  return function(goals) {
    return goals.map((goal, index) => {
      last[index] = last[index] + (goal - last[index]) / 200;
      return last[index];
    });
  };
}

function toVec3(color, name) {
  if (color) {
    if (color[name]) {
      return color[name].rgb.map(x => x / 255);
    }
  }
}

function createExtractColor(primary, secondary, fallback) {
  let prev = null;
  let color = fallback;
  const fade = createFade(color);
  return function getColor(colors) {
    if (prev !== colors) {
      color = toVec3(colors, primary) || toVec3(colors, secondary) || fallback;
      prev = colors;
    }
    return fade(color);
  }
}

const color1 = createExtractColor('vibrant', 'muted', [0, .5, 1]);
const color2 = createExtractColor('darkvibrant', 'lightvibrant', [3, .2, 1]);
const color3 = createExtractColor('darkmuted', 'lightmuted', [.6, .0, .6]);

export const Mood = ({children: t, colors, mix}) => {
  return <Node shader={shaders.mood} uniforms={{
    t,
    colorMix: mix,
    color1: color1(colors),
    color2: color2(colors),
    color3: color3(colors),
  }} />;
}

export const Noise = ({children: t}) => {
  return <Node shader={shaders.noise} uniforms={{t}} />;
}

export const HelloBlue = timed(({ time }) => {
  return <Node shader={shaders.helloBlue} uniforms={{ time: time / 1000 }} />;
});

export const Shrink = timed(({ children: t }) => {
  return <Node shader={shaders.shrink} uniforms={{ t }} />;
});

export const Pontus = timed(
  class extends Component {
    constructor(props) {
      super(props);
      this.lastTime = 0;
      this.progress = 0;
    }

    componentWillReceiveProps({ time, timeSpeed }) {
      const dt = time - this.lastTime;
      this.progress += dt / 1000 * timeSpeed;
      this.lastTime = time;
    }

    render() {
      const { thickness, effectMix, spacing, children: t } = this.props;

      return (
        <Node
          shader={shaders.pontus}
          uniforms={{
            t,
            effectMix,
            thickness,
            spacing,
            progress: this.progress,
          }}
        />
      );
    }
  }
);

export const DiamondCrop = ({ texture }) => {
  console.log(texture);
  return <Node shader={shaders.DiamondCrop} uniforms={{ t: texture }} />;
};

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
