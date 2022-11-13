import * as THREE from "three";
import Experiance from "./Experiance";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.experiance = new Experiance();
    this.sizes = this.experiance.sizes;
    this.scene = this.experiance.scene;
    this.canvas = this.experiance.canvas;

    this.createPerspectiveCamera();
    this.createOrthographicCamera();
    this.setOrbitControls();
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(
      35,
      this.sizes.aspect,
      0.1,
      1000
    );

    this.perspectiveCamera.position.y = 6.5;
    this.perspectiveCamera.position.z = 9;

    // this.scene.add(this.perspectiveCamera)
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.sizes.aspect * this.sizes.frustrum) / 2,
      (this.sizes.aspect * this.sizes.frustrum) / 2,
      this.sizes.frustrum / 2,
      -this.sizes.frustrum / 2,
      -50,
      50
    );

    this.orthographicCamera.rotation.x = -Math.PI / 6;
    this.orthographicCamera.position.y = 3.0;
    this.orthographicCamera.position.z = 5;

    this.scene.add(this.orthographicCamera)

    // this.helper = new THREE.CameraHelper(this.orthographicCamera)
    // this.scene.add(this.helper)

    // const size = 20;
    // const divisions = 20;

    // const gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    // const axesHelper = new THREE.AxesHelper( 5 );
    // this.scene.add( axesHelper );
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;
  }

  resize() {
    this.perspectiveCamera.aspect = this.sizes.aspect;
    this.perspectiveCamera.updateProjectionMatrix();

    this.orthographicCamera.left =
      (-this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.right =
      (this.sizes.aspect * this.sizes.frustrum) / 2;
    this.orthographicCamera.top = this.sizes.frustrum / 2;
    this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
    this.orthographicCamera.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
    // this.helper.matrixWorldNeedsUpdate = true
    // this.helper.update()
    // this.helper.position.copy(this.orthographicCamera.position)
    // this.helper.position.copy(this.orthographicCamera.rotation)
  }
}
