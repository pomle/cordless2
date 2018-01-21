import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import anime from 'animejs';

import { Renderer3D, followAspect, THREE } from 'components/Renderer3D';
import { imageToPlane } from 'components/Renderer3D/mesh';

import { Pontus } from '../shaders';
import { BetterBlur as Blur } from '../shaders/blur';

const resolution = {
  x: 400,
  y: 400,
};

const cameraDistance = 20;

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
    this.camera.position.z = cameraDistance;

    this.onResize = followAspect(this.camera);

    this.image = null;
    this.albums = new Set();
  }

  componentWillReceiveProps({ artwork }) {
    if (this.image === artwork) {
      return;
    }

    this.image = artwork;

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
        },
      });

      this.albums.delete(album);
    });

    const album = imageToPlane(artwork);
    album.scale.set(4, 4, 1);
    album.position.z = -5;
    album.material.opacity = 0;

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
  }

  onUpdate = (diff, total) => {
    this.camera.position.z = cameraDistance + Math.sin(total / 25000) * 10;
    this.albums.forEach(album => {
      album.rotation.x = Math.sin(total / 5368.9) * 0.2;
      album.rotation.y = Math.sin(total / 3923.4) * 0.2;
    });
  };

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
                    spacing={0.2}
                  >
                    <Blur passes={4} factor={4}>
                      <Renderer3D
                        size={resolution}
                        scene={this.scene}
                        camera={this.camera}
                        onUpdate={this.onUpdate}
                        onResize={this.onResize}
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
