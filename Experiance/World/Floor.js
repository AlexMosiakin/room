import * as THREE from "three";
import Experiance from "../Experiance";
import GSAP from "gsap";
import * as dat from "lil-gui";

// const gui = new dat.GUI({
//   width: 400,
// });

export default class Floor {
  constructor() {
    this.experiance = new Experiance();
    this.scene = this.experiance.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      // color: 0xf27dee,
      color: 0x5900ff,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;

    // gui.addColor(this.material, 'color').name('color')
  }

  setCircles() {
    const geometry = new THREE.CircleGeometry(5, 64);
    const material = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
    const material2 = new THREE.MeshStandardMaterial({ color: 0x8395cd });
    const material3 = new THREE.MeshStandardMaterial({ color: 0x7ad0ac });

    this.circleFirst = new THREE.Mesh(geometry, material);
    this.circleSecond = new THREE.Mesh(geometry, material2);
    this.circleThird = new THREE.Mesh(geometry, material3);

    this.circleFirst.position.y = -0.29;

    this.circleSecond.position.y = -0.28;
    this.circleSecond.position.x = 2;

    this.circleThird.position.y = -0.27;

    this.circleFirst.scale.set(0, 0, 0);
    this.circleSecond.scale.set(0, 0, 0);
    this.circleThird.scale.set(0, 0, 0);

    this.circleFirst.rotation.x =
      this.circleSecond.rotation.x =
      this.circleThird.rotation.x =
        -Math.PI / 2;

    this.circleFirst.receiveShadow =
      this.circleSecond.receiveShadow =
      this.circleThird.receiveShadow =
        true;

    this.scene.add(this.circleFirst);
    this.scene.add(this.circleSecond);
    this.scene.add(this.circleThird);
  }

  resize() {}

  update() {}
}