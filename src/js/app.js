import * as THREE from 'three';
import { TimelineMax } from 'gsap';
var OrbitControls = require('three-orbit-controls')(THREE);
import fragment from './fragment.glsl';
import vertex from './vertex.glsl';

let camera,
  pos,
  controls,
  scene,
  mesh,
  renderer,
  geometry,
  geometry1,
  material,
  plane,
  tex1,
  tex2;
let destination = { x: 0, y: 0 };
let textures = [];

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerWidth);

  var container = document.getElementById('container');
  container.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.001,
    100
  );
  camera.position.set(0, 0, 1);

  controls = new OrbitControls(camera, renderer.domElement);

  material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    uniforms: {
      time: { type: 'f', value: 0 }
    },
    // wireframe: true,
    vertexShader: vertex,
    fragmentShader: fragment
  });

  function CustomSinCurve(scale) {
    THREE.Curve.call(this);

    this.scale = scale === undefined ? 1 : scale;
  }

  CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
  CustomSinCurve.prototype.constructor = CustomSinCurve;

  CustomSinCurve.prototype.getPoint = function(t) {
    t = (Math.PI * 2) * t;
    var s = Math.sin(t);
    var c = Math.cos(t);
    var r = 2 + 6 * c;
    var tx = 1 + (-r * c) * 0.205 - 0.25;
    var ty = (-r * s) * 0.205;
    var tz = s * 0.65;

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
  };

  var path = new CustomSinCurve(10);
  var geometry = new THREE.TubeGeometry(path, 100, 2, 40, true);
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  resize();
}

window.addEventListener('resize', resize);
function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

let time = 0;
function animate() {
  time = time + 0.05;
  material.uniforms.time.value = time;

  mesh.rotation.y = time / 10;
  mesh.rotation.x = time / 30;

  requestAnimationFrame(animate);
  render();
}

function render() {
  renderer.render(scene, camera);
}

init();
animate();
