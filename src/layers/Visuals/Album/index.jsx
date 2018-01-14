import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';
import anime from 'animejs';

import { largest } from 'library/image';
import { Renderer3D } from 'components/Renderer3D';


import { BetterBlur as Blur } from '../shaders/blur';

import {loadImage} from 'library/image.js';

const THREE = window.THREE;

const resolution = {
  x: 1280,
  y: 720,
};

export class Album extends PureComponent {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0xffffff));
    //const light = new THREE.PointLight(0xffffff, 1, 100);
    //light.position.set(0, 0, 20);
    //this.scene.add(light);
    this.camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 30;

    this.image = null;
    this.albums = new Set();
  }

  componentWillReceiveProps({ album }) {
    const image = album && largest(album.images).url;

    if (this.image === image) {
      return;
    }

    this.image = image;

    this.albums.forEach(album => {
      anime({
        targets: [album.position, album.material],
        z: 10,
        y: 20,
        opacity: 0,
        duration: 1000,
        easing: 'easeInQuad',
        complete: () => {
          this.scene.remove(album);
        }
      });

      this.albums.delete(album);
    });

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

        album.position.z = -50;
        album.material.opacity = 0;

        this.scene.add(album);

        anime({
          targets: [album.position, album.material],
          z: 0,
          opacity: 1,
          duration: 2000,
          easing: 'easeOutQuad',
        });

        this.albums.add(album);
      });
  }

  /*
  onResize = (event) => {
    window.addEventListener('resize', this.onResize);
    window.removeEventListener('resize', this.onResize);

    const {camera} = this.props;
    if (camera) {
      const {offsetWidth, offsetHeight} = this.renderer.domElement;
      console.log(this.renderer.domElement.getBoundingClientRect());
      camera.aspect = offsetWidth / offsetHeight;
      camera.updateProjectionMatrix();
    }
  }*/

  update = (diff, total) => {
    for (const album of this.albums) {
      if (album.userData.update) {
        album.userData.update(diff, total);
      }
    }
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
                <Renderer3D size={resolution} scene={this.scene} camera={this.camera} onUpdate={this.update} />
              </Blur>
            )}
          </Motion>
        </Surface>
      </div>
    );
  }
}
