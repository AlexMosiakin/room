import * as THREE from "three";
import Experiance from "../Experiance";
import GSAP from "gsap";

export default class Room {
  constructor() {
    this.experiance = new Experiance();
    this.scene = this.experiance.scene;
    this.resources = this.experiance.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.time = this.experiance.time;
    this.roomChildren = {};

    this.lerp = {
      current: -Math.PI / 4,
      target: -Math.PI / 4,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    console.log(this.actualRoom)
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }

      child.scale.set(0, 0, 0);
      if (child.name === "Cube") {
        // child.scale.set(1, 1, 1);
        child.position.set(0, 0.1, 0);
        // child.rotation.y = Math.PI / 2;
      }

      this.roomChildren[child.name.toLowerCase()] = child;
    });

    this.scene.add(this.actualRoom);
    // this.actualRoom.scale.set(10.0, 10.0, 10.0);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1 + -Math.PI / 4;
    });
  }

  resize() {}

  update() {
    // this.cactus.uniforms.uTime.value = this.time.elapsed;

    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
