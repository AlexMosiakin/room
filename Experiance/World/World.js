import * as THREE from "three";
import Experiance from "../Experiance";
import Room from "./Room";
import Environment from "./Environment";
import Controls from "./Controls";
import Floor from "./Floor";
import { EventEmitter } from "events";

export default class World extends EventEmitter{
  constructor() {
    super();
    this.experiance = new Experiance();
    this.sizes = this.experiance.sizes;
    this.scene = this.experiance.scene;
    this.canvas = this.experiance.canvas;
    this.camera = this.experiance.camera;
    this.resources = this.experiance.resources;

    this.resources.on('ready', () => {
      this.environment = new Environment()
      this.room = new Room();
      this.floor = new Floor();
      // this.controls = new Controls();
      this.emit("worldready");
    })
  }

  resize() {

  }

  update() {
    if(this.room){
      this.room.update()
    }
    if(this.controls){
      this.controls.update()
    }
  }
}
