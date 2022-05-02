import "./style.css";
import * as THREE    from "https://unpkg.com/three@0.126.1/build/three.module.js";
import { OBJLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://unpkg.com/three@0.126.1/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js';


const onProgress = function ( xhr ) {

  if ( xhr.lengthComputable ) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
  }
};

const clock = new THREE.Clock();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFF);
const ambientLight = new THREE.AmbientLight(0xCCCCCC, 0.4);
scene.add( ambientLight );

const camera = new THREE.
  PerspectiveCamera(
  75, 
  innerWidth / innerHeight, 
  0.1, 
  1000
);

const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight )
const renderer = new THREE.WebGLRenderer();
renderer.outputEncoding = THREE.sRGBEncoding;

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set( 0, 0, 0 );
controls.autoRotate = true;
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

const modelPath = 'assets/obj_model/cryptopunk/';

new MTLLoader()
.setPath(modelPath)
.load('CryptoPunk9646.vox.mtl', function ( materials ) {
  materials.preload();
  new OBJLoader()
    .setMaterials( materials )
    .setPath(modelPath)
    .load('CryptoPunk9646.vox.obj', function (object) {
      object.position.y = -1;
      object.position.z = 6;
      scene.add(object);
      animate();
    }, onProgress);
});

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
// }
// animate();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  controls.update();
  renderer.render(scene, camera);
}





