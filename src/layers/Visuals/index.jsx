import React, { Component } from 'react';

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
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 450);

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
      this.renderer.render(this.scene, this.camera);
    });
  }

  onTrackChange = (track) => {
    this.uris.forEach(mesh => {
      this.scene.remove(mesh);
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
      console.log(mesh);
      this.camera.position.z = 20;
      mesh.userData.update = ms => {
        mesh.rotation.y += ms / 1000;
      };

      this.scene.add(mesh);

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
