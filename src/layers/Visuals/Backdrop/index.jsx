import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import anime from 'animejs';

import { loadImage, largest } from 'library/image';

import { Renderer3D, THREE } from 'components/Renderer3D';
import { imageToPlane } from 'components/Renderer3D/mesh';

import { Pontus } from '../shaders';
import { BetterBlur as Blur } from '../shaders/blur';

const resolution = {
  x: 400,
  y: 400,
};

export class Backdrop extends Component {
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
      album.userData.inAnimation.pause();
      anime({
        targets: [album.position, album.material],
        z: 10,
        y: 2,
        opacity: 0,
        duration: 3000,
        easing: 'easeInQuad',
        complete: () => {
          this.scene.remove(album);
        }
      });

      this.albums.delete(album);
    });

    loadImage(image)
      .then(imageToPlane)
      .then(album => {
        album.scale.set(4, 4, 1);
        album.position.z = -5;
        album.material.opacity = 0;

        window.album = album;

        album.userData.inAnimation = anime({
          targets: [album.position, album.material],
          z: 0,
          opacity: 1,
          delay: 2000,
          duration: 8000,
          easing: 'easeOutQuint',
        });

        this.scene.add(album);
        this.albums.add(album);
    });
  }

  onUpdate = (diff, total) => {

  }

  render() {
    const { promote, pulse } = this.props;
    return (
      <div className="Backdrop">
        <Surface width={resolution.x} height={resolution.x}>
          <Motion
            defaultStyle={{
              factor: 0,
              effectMix: 1.0,
            }}
            style={{
              factor: spring(promote ? 0 : 1, { stiffness: 70, damping: 5 }),
              effectMix: spring(0.5),
            }}
          >
            {({ factor, thickness, effectMix }) => {
              return (
                <Blur passes={2} factor={factor * 3}>
                  <Pontus
                    effectMix={effectMix}
                    thickness={pulse}
                    timeSpeed={0.1}
                    spacing={0.2}>
                    <Blur passes={4} factor={4}>
                      <Renderer3D
                        size={resolution}
                        scene={this.scene}
                        camera={this.camera}
                        onUpdate={this.update}
                      />
                    </Blur>
                  </Pontus>
                </Blur>
              );
            }}
          </Motion>
        </Surface>
      </div>
    );
  }
}
