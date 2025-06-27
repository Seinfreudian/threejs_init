import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
//const geometry = new THREE.SphereGeometry(1,32,8);
//const geometry = new THREE.PlaneGeometry(1,1, 16,2);
const geometry = new THREE.TorusKnotGeometry(1, 0.4, 40, 8);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: "red", shininess: 100 });
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
const pointlight = new THREE.PointLight(0xffffff, 2)
const ambilight = new THREE.AmbientLight(0xffffff,0.2)
pointlight.position.set(2,2,2)
scene.add(pointlight)
scene.add(ambilight)
//custom geometry
//set vertices
/*const vertices = new Float32Array([
  0,0,0,
  0,2,0,
  2,0,0
])
//set itemsize attribute
const bufferAttribute = new THREE.BufferAttribute(vertices, 3);
//set geometry
const geometry = new THREE.BufferGeometry()
geometry.setAttribute("position", bufferAttribute);

const cubeMaterial=new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true
});
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);*/
scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
