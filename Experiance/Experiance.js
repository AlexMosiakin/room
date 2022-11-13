import * as THREE from "three"
import Sizes from "./Utils/Sizes"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Time from "./Utils/Time"
import World from "./World/World"
import Resources from "./Utils/Resources"
import assets from './Utils/assets'
import Preloader from "./Preloader"
import Controls from "./World/Controls"

export default class Experiance{
    static instance 
    constructor(canvas){
        if(Experiance.instance){
            return Experiance.instance
        }
        Experiance.instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene()
        this.time = new Time()
        this.sizes = new Sizes()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.resources = new Resources(assets)
        this.world = new World()
        this.preloader = new Preloader();

        this.preloader.on("enablecontrols", () => {
            this.controls = new Controls();
        });
        
        this.sizes.on('resize', () => {
            this.resize()
        })

        this.time.on('update', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.world.update();
        this.renderer.resize()
    }

    update() {
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.controls) {
            this.controls.update();
        }
    }
}