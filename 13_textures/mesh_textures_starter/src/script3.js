import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const textureloader = new THREE.TextureLoader()

const scene = new THREE.Scene()

const spheregeometry1 = new THREE.SphereGeometry(0.5,32,32)
const spheregeometry2 = new THREE.SphereGeometry(0.5,32,32)

const material1 = new THREE.MeshStandardMaterial();
const material2 = new THREE.MeshStandardMaterial();


const sphere1 = new THREE.Mesh(spheregeometry1,material1)
const sphere2 = new THREE.Mesh(spheregeometry2,material2)

sphere1.position.x=-1
sphere2.position.x=1

scene.add(sphere1)
scene.add(sphere2)


//init ship texture
const space_albedo = new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')
const space_ao= new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png')
const space_height = new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png')
const space_metallic = new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png')
const space_normal = new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png')
const space_preview = new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_preview.jpg')
const space_roughness = new THREE.TextureLoader().load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png')

material1.map=space_albedo
material1.displacementMap=space_height
material1.displacementScale=0.11
material1.metalnessMap=space_metallic
material1.metalness=0.5
material1.normalMap=space_normal
material1.roughnessMap=space_roughness

const alight = new THREE.AmbientLight(0xffffff,0.9)
const plight = new THREE.PointLight(0xffffff, 3)
plight.position.set(-2,1,2)
scene.add(alight)
scene.add(plight)

const uv2sphere1 = new THREE.BufferAttribute(spheregeometry1.attributes.uv.array,2)
spheregeometry1.setAttribute('uv2',uv2sphere1)

//init boulder
const boulder_albedo = new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png')
const boulder_ao= new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
const boulder_height = new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
const boulder_metallic = new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png')
const boulder_normal = new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
const boulder_preview = new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_preview.jpg')
const boulder_roughness = new THREE.TextureLoader().load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')

material2.map=boulder_albedo
material2.displacementMap=boulder_height
material2.displacementScale=0.1
material2.metalnessMap=boulder_metallic
material2.normalMap=boulder_normal
material2.roughnessMap=boulder_roughness

const uv2sphere2 = new THREE.BufferAttribute(spheregeometry2.attributes.uv.array,2)
spheregeometry2.setAttribute('uv2',uv2sphere2)

material2.aoMap=boulder_ao
material2.aoMapIntensity=2


material1.aoMap=space_ao
material1.aoMapIntensity=1.1

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 10;


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


scene.background = new THREE.Color(0x000000)
// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  
  window.requestAnimationFrame(renderloop);
};

renderloop();
