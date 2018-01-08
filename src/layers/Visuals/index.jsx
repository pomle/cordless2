import React, { Component } from 'react';

import anime from 'animejs';
import {timer} from './timing.js';
import {onChange, loadImage} from './util.js';

import './Visuals.css';

const THREE = window.THREE;

export class Visuals extends Component {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight( 0x404040 ));
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 20;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 450);

    this.post = new THREE.DotScreenPass();

    this.composer = new THREE.EffectComposer( this.renderer );
    this.composer.addPass(new THREE.RenderPass(this.scene, this.camera));
    var dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
    dotScreenEffect.uniforms[ 'scale' ].value = 4;
    this.composer.addPass( dotScreenEffect );

    var rgbEffect = new THREE.ShaderPass( THREE.RGBShiftShader );
    rgbEffect.uniforms[ 'amount' ].value = 0.0015;
    rgbEffect.renderToScreen = true;
    this.composer.addPass( rgbEffect );
    this.composer.renderToScreen = true;


    this.updaters = new Set();

    this.onTrackChange = onChange(
      (a, b) => {
        if (!a) return false;

        if (a.uri) {
          if (!b) return true;
          if (a.uri === b.uri) return false;
          return true;
        }
      },
      this.onTrackChange);

    this.uris = new Map();
  }

  componentDidMount() {
    this.element.appendChild(this.renderer.domElement);
    this.renderer.domElement.style.height = null;
    this.renderer.domElement.style.width = null;

    this.timer = timer((diff, total) => {
      this.scene.children.forEach(object => {
        object.userData.update && object.userData.update(diff, total);
      });
      this.composer.render(this.scene, this.camera);
    });
  }

  onTrackChange = (track) => {
    this.uris.forEach(mesh => {
      anime({
        targets: mesh.position,
        x: 50,
        easing: [.91,-0.54,.29,1.56],
        complete: () => {
          this.scene.remove(mesh);
        }
      });

      anime({
        targets: mesh.position,
        z: 10,
        easing: 'easeOutQuad',
      });
    });

    loadImage(track.album.images[0].url)
    .then(image => {
      const geometry = new THREE.PlaneGeometry(10, 10);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        map: new THREE.Texture(image),
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.material.map.needsUpdate = true;
      return mesh;
    })
    .then(mesh => {
      mesh.userData.update = ms => {
        mesh.rotation.y += ms / 5000;
      };

      mesh.position.z = -50;
      mesh.material.opacity = 0;

      this.scene.add(mesh);

      anime({
        targets: mesh.position,
        opacity: 1,
        z: 0,
        easing: 'easeInQuad',
      });

      this.uris.set(track.uri, mesh);
    });
  }

  componentWillReceiveProps({track}) {
    this.onTrackChange(track);
  }

  render() {
    return <div
      className="Visuals"
      ref={node => this.element = node}
    />;
  }
}
