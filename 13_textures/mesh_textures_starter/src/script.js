import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

//init a group
const group = new THREE.Group()

// initialize the scene
const scene = new THREE.Scene();

//init loader
const textureloader = new THREE.TextureLoader()

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const spheregeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylindergeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

//init texture
const texture = new THREE.TextureLoader().load(
  '/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')
texture.repeat.set(2,2)
//texture.wrapS = THREE.MirroredRepeatWrapping
//texture.wrapT = THREE.MirroredRepeatWrapping
texture.wrapS=THREE.RepeatWrapping
texture.wrapT=THREE.RepeatWrapping
// initialize the material
const material = new THREE.MeshBasicMaterial({map:texture});
//material.color= new THREE.Color('green')
scene.background = new THREE.Color('white')
// initialize the mesh
const cube = new THREE.Mesh(geometry, material);
cube.rotation.x= -1* Math.PI * 0.5

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;

const sphere = new THREE.Mesh(spheregeometry, material);
sphere.position.y = 1.5;

const cylinder = new THREE.Mesh(cylindergeometry, material)
cylinder.position.y = -1.5
plane.rotation.x= -1*Math.PI * 0.5
plane.scale.set(100,100)




// add the mesh to the scene
//scene.add(cube, knot)
//scene.add(group)
scene.add(plane);
//scene.add(sphere)
//scene.add(cylinder)

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 10;
camera.position.y = 5;

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



// render the scene
const renderloop = () => {
  /*group.children.forEach(child => {
    if (child instanceof THREE.Mesh){
      child.rotation.x += 0.05;
    }
  });*/
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
