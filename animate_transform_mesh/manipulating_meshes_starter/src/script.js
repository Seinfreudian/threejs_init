import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "skyblue", wireframe:true });


const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const axesHelper = new THREE.AxesHelper(2)

cubeMesh.rotation.reorder('YXZ')

cubeMesh.add(axesHelper);
cubeMesh.rotation.y=THREE.MathUtils.degToRad(45)
cubeMesh.rotation.x=THREE.MathUtils.degToRad(45)

scene.add(cubeMesh);


const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

const y=cubeMesh.position.distanceTo(camera.position)
console.log(y)

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener('resize', () =>{
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight);
})
//initialise clock
const clock = new THREE.Clock()
let previousTime = 0;

// render the scene
const renderloop = () => {
  //cubeMesh.rotation.y += THREE.MathUtils.degToRad(1)
  const currtime = clock.getElapsedTime();
  const delta = currtime - previousTime

  previousTime=currtime
  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1)*delta*50
  
  cubeMesh.scale.x = 0.5*(Math.sin(currtime))+2
  cubeMesh.position.x = (Math.sin(currtime))

  controls.update();  
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
