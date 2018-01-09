import React, { Component } from 'react';

import anime from 'animejs';
import {timer} from './timing.js';
import {onChange, loadImage} from './util.js';

import './Visuals.css';

const THREE = window.THREE;

function compose(scene, camera, renderer) {
    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(new THREE.RenderPass(scene, camera));

    const blur = 1 / 400;

    const hblur = new THREE.ShaderPass( THREE.HorizontalBlurShader );
    hblur.uniforms.h.value = blur;
    console.log(hblur);
    composer.addPass( hblur );

    const vblur = new THREE.ShaderPass( THREE.VerticalBlurShader );
    // set this shader pass to render to screen so we can see the effects
    vblur.uniforms.v.value = blur;
    //vblur.renderToScreen = true;
    composer.addPass( vblur );
    /*var dotScreenEffect = new THREE.ShaderPass( THREE.DotScreenShader );
    dotScreenEffect.uniforms[ 'scale' ].value = 4;
    composer.addPass( dotScreenEffect );*/

    var rgbEffect = new THREE.ShaderPass( THREE.RGBShiftShader );
    rgbEffect.uniforms[ 'amount' ].value = 0.0045;
    rgbEffect.renderToScreen = true;
    composer.addPass( rgbEffect );

    return composer;
}

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

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AmbientLight( 0x909090 ));
    var light = new THREE.PointLight( 0xffffff, 1, 100 );
    light.position.set( 0, 0, 20);
    this.scene.add( light );
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(800, 450);

    this.composer = compose(this.scene, this.camera, this.renderer);

    this.updaters = new Set();

    this.onAlbumChange = onChange(compareObjectURIs, this.onAlbumChange);
    this.onTrackChange = onChange(compareObjectURIs, this.onTrackChange);

    this.uris = new Map();
    this.backgrounds = new Set();
  }

  onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
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

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onAlbumChange = (album) => {
    this.backgrounds.forEach(mesh => {
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
    });
  }

  onTrackChange = (track) => {
    this.onAlbumChange(track.album);
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
