/* eslint-disable no-plusplus */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const params = {
  exposure: 1.7,
  bloomStrength: 2.2,
  bloomThreshold: 0,
  bloomRadius: 0,
};

export const createLoginEffect = () => {
  const dom = document.getElementById('login-container') as HTMLDivElement;
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    10000,
  );

  scene.fog = new THREE.FogExp2(0x05050c, 0.0005);

  const webGLRenderer = new THREE.WebGLRenderer({ antialias: true });
  webGLRenderer.setClearColor(0x0d0e20, 0.1);
  webGLRenderer.setSize(WIDTH, HEIGHT);

  // position and point the camera to the center of the scene
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = WIDTH / 1.5;

  const composer = new EffectComposer(webGLRenderer);
  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1,
    0.4,
    0.85,
  );
  bloomPass.threshold = params.bloomThreshold;
  bloomPass.strength = params.bloomStrength;
  bloomPass.radius = params.bloomRadius;

  composer.addPass(renderPass);
  composer.addPass(bloomPass);

  // add the output of the renderer to the html element
  dom.appendChild(webGLRenderer.domElement);

  const group = new THREE.Object3D();

  createSprites();
  render();

  function createSprites() {
    for (let i = 0; i < 1000; i++) {
      group.add(createSprite(2, true, 0.99, 0xffffff));
    }
    scene.add(group);
  }

  function createSprite(
    size: number,
    transparent: boolean,
    opacity: number,
    color: number,
  ) {
    const spriteMaterial = new THREE.SpriteMaterial({
      opacity,
      color,
      transparent,
      // map: getTexture(),
      fog: true,
    });

    // we have 1 row, with five sprites
    // spriteMaterial.map.offset = new THREE.Vector2(0.2 * spriteNumber, 0);
    // spriteMaterial.map.repeat = new THREE.Vector2(1 / 5, 1);
    spriteMaterial.depthTest = false;

    spriteMaterial.blending = THREE.AdditiveBlending;

    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size, size);
    sprite.position.set(
      Math.random() * WIDTH - WIDTH / 2,
      Math.random() * HEIGHT - HEIGHT / 2,
      Math.random() * WIDTH - WIDTH / 2,
    );

    return sprite;
  }

  let step = 0;

  function render() {
    step += 0.001;
    group.rotation.y = step;

    requestAnimationFrame(render);
    composer.render();
  }
};
