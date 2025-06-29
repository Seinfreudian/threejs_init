import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


console.log(OrbitControls);
// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight,
  0.1,
  200)

/*const camera = new THREE.OrthographicCamera(
  -1*aspectratio,
  1*aspectratio,
  1,
  -1,
  0.1,
  200
)*/
camera.position.z = 4

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
})

//initialise controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.dampingFactor = 0.05
//controls.autoRotate = true
//controls.autoRotateSpeed = 2
//controls.enableZoom = true
renderer.setSize(window.innerWidth, window.innerHeight)

window.addEventListener('resize', () => {
  camera.aspect=window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
const maxpixelratio=Math.min(2,window.devicePixelRatio)
renderer.setPixelRatio(maxpixelratio)

const renderloop = () =>{
  controls.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(renderloop)
  
}
renderloop()


