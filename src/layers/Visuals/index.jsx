import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { Surface } from 'gl-react-dom';

import { onChange } from './util.js';

import { Pontus, HelloBlue } from './shaders';
import { BetterBlur as Blur } from './shaders/blur';

import './Visuals.css';

function compareObjectURIs(a, b) {
  if (!a) return false;

  if (a.uri) {
    if (!b) return true;
    if (a.uri === b.uri) return false;
    return true;
  }
}

export class Visuals extends Component {
  constructor(props) {
    super(props);

    /*this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight( 0x909090 ));
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 0, 20);
    this.scene.add( light );
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 450);

    this.composer = compose(this.scene, this.camera, this.renderer);*/

    this.updaters = new Set();

    this.onAlbumChange = onChange(compareObjectURIs, this.onAlbumChange);
    this.onTrackChange = onChange(compareObjectURIs, this.onTrackChange);

    this.uris = new Map();
    this.backgrounds = new Set();

    this.state = {
      track: null,
      album: null,
    };
  }

  onResize = () => {
    //this.camera.aspect = window.innerWidth / window.innerHeight;
    //this.camera.updateProjectionMatrix();
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onAlbumChange = album => {
    this.setState({ album });
    /*this.backgrounds.forEach(mesh => {
      anime({
        targets: mesh.material,
        opacity: 0,
        complete: () => {
          this.scene.remove(mesh);
          this.backgrounds.delete(mesh);
        }
      });
    });

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

    loadImage(album.images[0].url)
    .then(image => {
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      return texture;
    })
    .then(texture => {
      const background = new THREE.Mesh(
        new THREE.PlaneGeometry(2000, 2000),
        new THREE.MeshPhongMaterial({map: texture, opacity: 0, transparent: true}));

      const album = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshPhongMaterial({map: texture, opacity: 0, transparent: true}));

      background.material.opacity = 0;
      background.position.z = -100;
      background.userData.update = (ms, total) => {
        background.position.x = (Math.sin(total / 50000) * 40) - 10;
        background.position.y = (Math.cos(total / 30000) * 20) - 10;
        background.rotation.x = (Math.sin(3000 + total / 10500) * 0.3);
        background.rotation.y = (Math.sin(total / 10000) * 0.3);
      };

      album.userData.update = (diff, time) => {
        album.rotation.y = (Math.sin(time / 10000) * 1);
      };

      album.position.z = -50;
      album.material.opacity = 0;

      this.scene.add(album);
      this.scene.add(background);

      anime({
        targets: [album.material, album.position, background.material],
        z: 0,
        opacity: 1,
        easing: 'easeInQuad',
      });

      this.uris.set(album.uri, album);
    });*/
  };

  onTrackChange = track => {
    this.setState({ track });
    this.onAlbumChange(track.album);
  };

  componentWillReceiveProps({ track }) {
    this.onTrackChange(track);
  }

  render() {
    console.log('Visual props', this.props);
    const { promote, context } = this.props;
    const { album } = this.state;
    const image = album && album.images[0].url;
    return (
      <div className="Visuals" ref={node => (this.element = node)}>
        <div className="album">
          <Surface width={400} height={400}>
            <Motion
              defaultStyle={{ factor: 0 }}
              style={{ factor: spring(promote ? 0 : 4) }}
            >
              {({ factor }) => (
                <Blur passes={4} factor={factor}>
                  {image}
                </Blur>
              )}
            </Motion>
          </Surface>
        </div>

        <div className="background">
          <Surface width={400} height={400}>
            <Motion
              defaultStyle={{ factor: 0 }}
              style={{
                factor: spring(promote ? 0 : 1, { stiffness: 70, damping: 5 }),
              }}
            >
              {({ factor }) => (
                <Blur passes={2} factor={factor * 3}>
                  <Pontus>
                    <Blur passes={4} factor={10}>
                      {image}
                    </Blur>
                  </Pontus>
                </Blur>
              )}
            </Motion>
          </Surface>
        </div>
      </div>
    );
  }
}
