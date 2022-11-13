import { EventEmitter } from "events";
import Experiance from "./Experiance.js";
import GSAP from "gsap";
import convert from "./Utils/convertDivsToSpans.js";
import * as dat from "lil-gui";

// const gui = new dat.GUI({
//   width: 400,
// });

export default class Preloader extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experiance();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.world = this.experience.world;
    this.device = this.sizes.device;

    this.sizes.on("switchdevice", (device) => {
      this.device = device;
    });

    this.world.on("worldready", () => {
      this.setAssets();
      this.playIntro();
    });
  }

  setAssets() {
    convert(document.querySelector(".intro-text"));
    convert(document.querySelector(".hero-main-title"));
    convert(document.querySelector(".hero-main-description"));
    convert(document.querySelector(".hero-second-subheading"));
    convert(document.querySelector(".second-sub"));

    this.room = this.experience.world.room.actualRoom;
    this.roomChildren = this.experience.world.room.roomChildren;
    console.log(this.roomChildren);

    // gui.add(this.roomChildren.cube.scale, "x").min(-100).max(100).step(0.1);
    // gui.add(this.roomChildren.cube.scale, "y").min(-100).max(100).step(0.1);
    // gui.add(this.roomChildren.cube.scale, "z").min(-100).max(100).step(0.1);

    // gui.add(this.roomChildren.cube.position, "x").min(-100).max(100).step(0.1);
    // gui.add(this.roomChildren.cube.position, "y").min(-100).max(100).step(0.1);
    // gui.add(this.roomChildren.cube.position, "z").min(-100).max(100).step(0.1);
  }

  firstIntro() {
    return new Promise((resolve) => {
      this.timeline = new GSAP.timeline();
      this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
      this.timeline.to(".preloader", {
        opacity: 0,
        delay: 1,
        onComplete: () => {
          document.querySelector(".preloader").classList.add("hidden");
        },
      });
      if (this.device === "desktop") {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 1.5,
            y: 1.5,
            z: 1.5,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            x: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      } else {
        this.timeline
          .to(this.roomChildren.cube.scale, {
            x: 2,
            y: 2,
            z: 2,
            ease: "back.out(2.5)",
            duration: 0.7,
          })
          .to(this.room.position, {
            z: -1,
            ease: "power1.out",
            duration: 0.7,
          });
      }
      this.timeline
        .to(".intro-text .animatedis", {
          yPercent: 0,
          stagger: 0.05,
          ease: "back.out(1.7)",
        })
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 1,
            onComplete: resolve,
          },
          "same"
        );
      // .to(
      //     ".toggle-bar",
      //     {
      //         opacity: 1,
      //         onComplete: resolve,
      //     },
      //     "same"
      // );
    });
  }

  secondIntro() {
    return new Promise((resolve) => {
      this.secondTimeline = new GSAP.timeline();

      this.secondTimeline
        .to(
          ".intro-text .animatedis",
          {
            yPercent: 100,
            stagger: 0.05,
            ease: "back.in(1.7)",
          },
          "fadeout"
        )
        .to(
          ".arrow-svg-wrapper",
          {
            opacity: 0,
          },
          "fadeout"
        )
        .to(
          this.room.position,
          {
            x: 0,
            y: 0,
            z: 0,
            ease: "power1.out",
          },
          "same"
        )
        .to(
          this.roomChildren.cube.rotation,
          {
            y: 2 * Math.PI + Math.PI / 2,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 10.5,
            y: 10.5,
            z: 10.5,
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera.position,
          {
            y: 3.5,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.position,
          {
            x: 0,
            y: 1,
            z: 0,
          },
          "same"
        )
        .to(
          this.roomChildren.cube.scale,
          {
            x: 0,
            y: 0,
            z: 0,
            duration: 0.5,
          },
          "introtext"
        )
        .to(
          this.roomChildren.floor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
          },
        )
        .to(
          this.roomChildren.shelf.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.5,
          },
          ">-0.5",
        )
        .to(
          ".hero-main-title .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          ".hero-main-description .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          ".first-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          ".second-sub .animatedis",
          {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.7)",
          },
          "introtext"
        )
        .to(
          this.roomChildren.shelfcone.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.1",
        )
        .to(
          this.roomChildren.shelfcube.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3",
        )
        .to(
          this.roomChildren.shelfsphere.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.4",
        )
        .to(
          this.roomChildren.carpet.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.5",
        )
        .to(
          this.roomChildren.skate.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.4",
        )
        .to(
          this.roomChildren.camera.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.3",
        )
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.2",
        )
        .to(
          this.roomChildren.desk.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.7)",
            duration: 0.5,
          },
          ">-0.1",
        )
        .to(
          this.roomChildren.mouseplane.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.1",
        )
        .to(
          this.roomChildren.mouse.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.2",
        )
        .to(
          this.roomChildren.monitor.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.7)",
            duration: 0.5,
          },
          ">-0.3",
        )
        .to(
          this.roomChildren.keyboard.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.4",
        )
        .to(
          this.roomChildren.flower.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(2.2)",
            duration: 0.5,
          },
          ">-0.1",
        )
        .to(
          this.roomChildren.game.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.7)",
            duration: 0.5,
          },
          ">-0.2",
        )
        .to(
          this.roomChildren.chair.scale,
          {
            x: 1,
            y: 1,
            z: 1,
            ease: "back.out(1.7)",
            duration: 0.5,
          },
          ">-0.3",
        )
        .to(".arrow-svg-wrapper", {
          opacity: 1,
          onComplete: resolve,
        });
    });
  }

  onScroll(e) {
    if (e.deltaY > 0) {
      this.removeEventListeners();
      this.playSecondIntro();
    }
  }

  onTouch(e) {
    this.initalY = e.touches[0].clientY;
  }

  onTouchMove(e) {
    let currentY = e.touches[0].clientY;
    let difference = this.initalY - currentY;
    if (difference > 0) {
      console.log("swipped up");
      this.removeEventListeners();
      this.playSecondIntro();
    }
    this.intialY = null;
  }

  removeEventListeners() {
    window.removeEventListener("wheel", this.scrollOnceEvent);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
  }

  async playIntro() {
    this.scaleFlag = true;
    await this.firstIntro();
    this.moveFlag = true;
    this.scrollOnceEvent = this.onScroll.bind(this);
    this.touchStart = this.onTouch.bind(this);
    this.touchMove = this.onTouchMove.bind(this);
    window.addEventListener("wheel", this.scrollOnceEvent);
    window.addEventListener("touchstart", this.touchStart);
    window.addEventListener("touchmove", this.touchMove);
  }
  async playSecondIntro() {
    this.moveFlag = false;
    await this.secondIntro();
    this.scaleFlag = false;
    this.emit("enablecontrols");
  }

  move() {
    if (this.device === "desktop") {
      this.room.position.set(-1, 0, 0);
    } else {
      this.room.position.set(0, 0, -1);
    }
  }

  scale() {
    // this.roomChildren.rectLight.width = 0;
    // this.roomChildren.rectLight.height = 0;

    if (this.device === "desktop") {
      // this.room.scale.set(0.11, 0.11, 0.11);
    } else {
      this.room.scale.set(0.7, 0.7, 0.7);
    }
  }

  update() {
    if (this.moveFlag) {
      this.move();
    }

    if (this.scaleFlag) {
      this.scale();
    }
  }
}
