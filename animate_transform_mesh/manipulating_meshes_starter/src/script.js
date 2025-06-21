import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "skyblue", wireframe:true });


const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
const axesHelper = new THREE.AxesHelper(2)

cubeMesh.position.y=1
cubeMesh.position.x=1
cubeMesh.add(axesHelper);
/*const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x=2
cubeMesh2.position.y=-2
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x=-2
cubeMesh3.scale.setScalar(0.5)

const group = new THREE.Group()
group.add(cubeMesh)
group.add(cubeMesh2)
group.add(cubeMesh3)
scene.add(group);*/
scene.add(cubeMesh);

//const tempvector = new THREE.Vector3(1,0,0)

//cubeMesh.scale.set(1,1,1)
//group.position.y=2
//group.scale.setScalar(2)
//cubeMesh.position.copy(tempvector);

//const axesHelper = new THREE.AxesHelper(2)
//scene.add(axesHelper);
// initialize the camera
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

// render the scene
const renderloop = () => {
  controls.update();  
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
