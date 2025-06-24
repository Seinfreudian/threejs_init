import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();


// initialize the scene
const scene = new THREE.Scene();
const torusknowgeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
//const material = new THREE.MeshBasicMaterial({
 // color: "red"})
//const material = new THREE.MeshPhongMaterial()
//material.shininess=260
const material = new THREE.MeshStandardMaterial();
material.color = new THREE.Color('LimeGreen');

material.metalness = 0.4;
material.roughness = 0.4;
material.clearcoat = 0.11;


const mesh = new THREE.Mesh(geometry, material)
mesh.position.x = -2;
const mesh2 = new THREE.Mesh(torusknowgeometry, material)
mesh2.position.x = 2;
scene.add(mesh2);
scene.add(mesh);


//init light
//ambient
const light = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(light);

//point light
const pointlight = new THREE.PointLight(0xffffff, 26)
pointlight.position.set(5,5,2)
scene.add(pointlight)




//const planegeometry = new THREE.PlaneGeometry(1, 1, 16, 2);

// initialize the material
/*const material = new THREE.MeshBasicMaterial({
  //color: 'skyblue',
  //transparent: true,
  //opacity: 0.5,
  fog:false
});

material.color = new THREE.Color('red');
material.transparent = true;
material.opacity = 0.5;

// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.position.x = -2;
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.x = 2;
scene.add(mesh);
scene.add(mesh2);*/


//initialise plane mesh
const planegeometry = new THREE.PlaneGeometry(2,2);
/*const matplane = new THREE.MeshBasicMaterial({
  color: 'skyblue',
  transparent: true,
  opacity: 0.8,
  side: THREE.DoubleSide,
  //side: THREE.FrontSide, 
  fog: false
});
const planemesh = new THREE.Mesh(planegeometry, material);
//planemesh.position.y = -1.5;
scene.add(planemesh);

/*
//adding fog + scene bg mod
const fog = new THREE.Fog(0x111111, 1, 10)
scene.fog = fog
scene.background = new THREE.Color(0xffffff)*/

//scene.background = new THREE.Color(0x222222);



// initialize the camera
const camera = new THREE.PerspectiveCamera(
  55,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;
//camera.position.set(0, 0, 20);

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
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
