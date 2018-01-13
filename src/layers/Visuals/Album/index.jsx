import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import { Renderer3D } from 'components/Renderer3D';

import { BetterBlur as Blur } from '../shaders/blur';

import {loadImage} from 'library/image.js';

const THREE = window.THREE;

const resolution = {
  x: 800,
  y: 450,
};

export class Album extends Component {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0x909090));
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 20);
    this.scene.add(light);
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.image = null;
    this.albums = [];
  }

  componentWillReceiveProps({ image }) {
    if (this.image === image) {
      return;
    }

    this.image = image;

    loadImage(image)
      .then(image => {
        const texture = new THREE.Texture(image);
        texture.needsUpdate = true;
        return texture;
      })
      .then(texture => {
        const album = new THREE.Mesh(
          new THREE.PlaneGeometry(10, 10),
          new THREE.MeshPhongMaterial({
            map: texture,
            opacity: 1,
            transparent: true,
          })
        );

        album.userData.update = (diff, time) => {
          album.rotation.y = Math.sin(time / 10000) * 1;
        };

        this.albums.push(album);
        album.position.z = -10;
        //album.material.opacity = 0;

        this.scene.add(album);
      });
  }

  render() {
    const { promote } = this.props;

    return (
      <div className="Album">
        <Surface width={resolution.x} height={resolution.y}>
          <Motion
            defaultStyle={{ factor: 0 }}
            style={{ factor: spring(promote ? 0 : 4) }}
          >
            {({ factor }) => (
              <Blur passes={4} factor={factor}>
                <Renderer3D scene={this.scene} camera={this.camera} />
              </Blur>
            )}
          </Motion>
        </Surface>
      </div>
    );
  }
}
