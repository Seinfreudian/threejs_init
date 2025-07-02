import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

const textureloader = new THREE.TextureLoader()

const spheregeometry = new THREE.SphereGeometry(1,32,32)

const cube_texture_loader = new THREE.CubeTextureLoader()


//texture
const mercury_texture = new THREE.TextureLoader().load('/textures/2k_mercury.jpg')
const mars_texture = new THREE.TextureLoader().load('/textures/2k_mars.jpg')
const earth_texture = new THREE.TextureLoader().load('/textures/2k_earth_daymap.jpg')
const moon_texture = new THREE.TextureLoader().load('/textures/2k_moon.jpg')
const sun_texture = new THREE.TextureLoader().load('/textures/2k_sun.jpg')
const venus_texture = new THREE.TextureLoader().load('/textures/2k_venus_surface.jpg')
//const bg_texture = textureloader.load('/textures/2k_stars_milky_way.jpg')
cube_texture_loader.setPath('/textures/cubeMap')

//scene.background = (bg_texture)
const bg_cube_map = cube_texture_loader.load([
				'/px.png',
				'/nx.png',
				'/py.png',
				'/ny.png',
				'/pz.png',
				'/nz.png'
] )

scene.background=bg_cube_map

//sun example
const sun_material = new THREE.MeshStandardMaterial({map:sun_texture})
const sunmesh = new THREE.Mesh(spheregeometry, sun_material)
sunmesh.scale.setScalar(5)
scene.add(sunmesh)

//material
const mercury_material = new THREE.MeshStandardMaterial({map:mercury_texture})
const mars_material = new THREE.MeshStandardMaterial({map:mars_texture})
const earth_material = new THREE.MeshStandardMaterial({map:earth_texture})
const moon_material = new THREE.MeshStandardMaterial({map:moon_texture})

const venus_material = new THREE.MeshStandardMaterial({map:venus_texture})


const planets=[{
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercury_material,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venus_material,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earth_material,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: mars_material,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const alight = new THREE.AmbientLight(0xffffff,0.2)
scene.add(alight)

const plight = new THREE.PointLight(0xffffff,2)
scene.add(plight)

const helper = new THREE.PointLightHelper(plight)
scene.add(helper)

//automate mesh generation
const planet_meshes = planets.map((planet)=>{
  const planet_mesh = new THREE.Mesh(spheregeometry,planet.material)
  planet_mesh.scale.setScalar(planet.radius)
  planet_mesh.position.x = planet.distance
  scene.add(planet_mesh)

  planet.moons.forEach((moon)=>{
    const moon_mesh = new THREE.Mesh(spheregeometry,moon_material)
    moon_mesh.scale.setScalar(moon.radius)
    moon_mesh.position.x = moon.distance
    planet_mesh.add(moon_mesh)
  })
  return planet_mesh

})


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//init clock
const clock = new THREE.Clock()

// render loop
const renderloop = () => {
  planet_meshes.forEach((planet,index)=>{
    planet.rotation.y += planets[index].speed
    planet.position.x = Math.sin(planet.rotation.y)*planets[index].distance
    planet.position.z= Math.cos(planet.rotation.y)*planets[index].distance
    planet.children.forEach((moon,moonindex)=>{
      moon.rotation.y += planets[index].moons[moonindex].speed
      moon.position.x = Math.sin(moon.rotation.y)*planets[index].moons[moonindex].distance
      moon.position.z = Math.cos(moon.rotation.y)*planets[index].moons[moonindex].distance
    })
    
  })
  //const elapsedtime = clock.getElapsedTime()
  
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();
