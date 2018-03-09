import React, { PureComponent } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';
import anime from 'animejs';

import { Renderer3D, THREE, followAspect } from 'components/Renderer3D';
import { imageToPlane } from 'components/Renderer3D/mesh';

import { BetterBlur as Blur } from '../shaders/blur';

const resolution = {
  x: 1280,
  y: 720,
};

function tween(subject, options = {}) {
  const {rigidity, alias} = Object.assign({
    rigidity: 10,
    alias: new Map(),
  }, options);

  const keys = Object.keys(subject);
  let last = Object.assign({}, subject);
  let intended = subject;


  function refresh() {
    for (const key of keys) {
      last[key] = last[key] + (intended[key] - last[key]) / rigidity;
      subject[key] = last[key];
    }

    requestAnimationFrame(refresh);
  }

  refresh();

  return function update(values) {
    intended = alias.has(values) ? alias.get(values) : values;
  };
}

export class Album extends PureComponent {
  constructor(props) {
    super(props);

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight(0xffffff));

    this.container = new THREE.Object3D();

    const visible = new THREE.Vector3(0, 0, 0);
    const invisible = new THREE.Vector3(0, 20, 30);

    this.container.tween = tween(this.container.position.copy(invisible), {
      rigidity: 100,
      alias: new Map([
        [true, visible],
        [false, invisible],
      ]),
    });

    this.scene.add(this.container);
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

    this.onResize = followAspect(this.camera);

    this.image = null;
    this.albums = new Set();
  }

  componentWillReceiveProps({ promote, artwork }) {
    this.handleArtwork(artwork);
    this.setVisibility(promote);
  }

  handleArtwork(artwork) {
    if (this.image === artwork) {
      return;
    }

    this.image = artwork;

    this.albums.forEach(album => {
      album.userData.entryAnim.pause();

      anime({
        targets: [album.position, album.material],
        z: 10,
        y: 20,
        opacity: 0,
        duration: 1000,
        easing: 'easeInQuad',
        complete: () => {
          this.container.remove(album);
        },
      });

      this.albums.delete(album);
    });

    const album = imageToPlane(artwork);
    album.position.z = -50;
    album.material.opacity = 0;

    this.container.add(album);

    album.userData.entryAnim = anime({
      targets: [album.position, album.material],
      z: 0,
      opacity: 1,
      duration: 2000,
      easing: 'easeOutQuad',
    });

    this.albums.add(album);
  }

  setVisibility(visible) {
    this.container.tween(visible);
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
  };

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
                <Renderer3D
                  alpha
                  size={resolution}
                  scene={this.scene}
                  camera={this.camera}
                  onUpdate={this.update}
                  onResize={this.onResize}
                />
              </Blur>
            )}
          </Motion>
        </Surface>
      </div>
    );
  }
}
