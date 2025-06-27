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

//init material
const material = new THREE.MeshStandardMaterial()

//init texture
const grass_albedo = new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png')
const grass_ao= new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png')
const grass_height = new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png')
const grass_metallic = new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png')
const grass_normal = new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png')
const grass_preview = new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_preview.jpg')
const grass_roughness = new THREE.TextureLoader().load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png')

material.map=grass_albedo
material.roughnessMap=grass_roughness
material.metalnessMap=grass_metallic
material.normalMap=grass_normal
material.displacementMap=grass_height
material.displacementScale=0.1

//adding uv2 to geometry
const uv2geometry = new THREE.BufferAttribute(geometry.attributes.uv.array,2)
geometry.setAttribute('uv2',uv2geometry)

const uv2tkg = new THREE.BufferAttribute(torusKnotGeometry.attributes.uv.array,2)
torusKnotGeometry.setAttribute('uv2',uv2tkg)

const uv2plane = new THREE.BufferAttribute(planeGeometry.attributes.uv.array,2)
planeGeometry.setAttribute('uv2',uv2plane)

const uv2sphere = new THREE.BufferAttribute(spheregeometry.attributes.uv.array,2)
spheregeometry.setAttribute('uv2',uv2sphere)

const uv2cyl = new THREE.BufferAttribute(cylindergeometry.attributes.uv.array,2)
cylindergeometry.setAttribute('uv2',uv2cyl)

material.aoMap=grass_ao
material.aoMapIntensity = 1.2


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






// add the mesh to the scene
scene.add(cube, knot)
scene.add(plane);
scene.add(sphere)
scene.add(cylinder)

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 23);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
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



// render the scene
const renderloop = () => {
  /*scene.children.forEach(child => {
    if (child instanceof THREE.Mesh){
      child.rotation.y += 0.02;
    }
  });*/
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
