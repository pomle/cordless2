import React, { Component } from 'react';
import { Node, GLSL } from 'gl-react';
import { timer } from './timing.js';

/*
I have not figured out to feed a canvas, like the one returned by THREE.js
immediately as a gl-react node without supplying it as a texture, so this is
a noop shader only needed to create the node.

Alternatively if React would allow us to send out the <canvas/> element directly
that would also work.
*/
const shader = {
  frag: GLSL`
precision mediump float;
varying vec2 uv;
uniform sampler2D texture;

void main() {
  gl_FragColor = texture2D(texture, uv);
}
`,
};

const THREE = window.THREE;

export class Renderer3D extends Component {
  static defaultProps = {
    size: { x: 800, y: 450 },
  };

  constructor(props) {
    super(props);

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(props.size.x, props.size.y);

    this.state = {
      time: null,
    };
  }

  componentDidMount() {
    this.timer = timer((diff, total) => {
      const { scene, camera, onUpdate } = this.props;
      if (onUpdate) {
        onUpdate(diff, total);
      }

      if (scene) {
        if (camera) {
          this.renderer.render(scene, camera);
        }
      }

      this.setState({
        time: total,
      });
    });
  }

  componentWillUnmount() {
    this.timer.stop();
  }

  render() {
    return (
      <Node shader={shader} uniforms={{ texture: this.renderer.domElement}} />
    );
  }
}
