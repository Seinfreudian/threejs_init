import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const textureloader = new THREE.TextureLoader()

const scene = new THREE.Scene()

const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5,0.15,100,16)
const spheregeometry = new THREE.SphereGeometry(0.5,32,32)
const material = new THREE.MeshPhongMaterial();
material.color=new THREE.Color('skyblue')
material.shininess=600

const spheremesh = new THREE.Mesh(spheregeometry,material)
spheremesh.position.x=0.5
const tkgmesh = new THREE.Mesh(torusKnotGeometry, material)
tkgmesh.position.x=-1

const alight = new THREE.AmbientLight(0xffffff,0.8)

const plight_green = new THREE.PointLight(0x00ff00,8)
plight_green.position.set(-2,2,2)

const plight_blue = new THREE.PointLight(0x0000ff,9)
plight_blue.position.set(2,1,2)

const plight_red = new THREE.PointLight(0xff0000, 12)
plight_red.position.set(1,1,1)

scene.add(plight_green)
scene.add(plight_red)
scene.add(alight)
scene.add(plight_blue)

scene.add(tkgmesh)
scene.add(spheremesh)

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
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

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


scene.background = new THREE.Color(0x141b46)
// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  
  window.requestAnimationFrame(renderloop);
};

renderloop();
