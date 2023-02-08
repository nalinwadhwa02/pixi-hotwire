import { Container, InteractionEvent, Sprite } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { lerp } from "../utils/constants";


export class Background extends Container implements IScene {
    private bg: Sprite;
    private centerpos: {x: number, y: number};
    private movepos: {x: number, y: number};
    private lerpstrength: number;
    constructor() {
        super();
        this.bg = Sprite.from("bg-1");
        this.bg.scale.set(0.5);
        this.bg.anchor.set(0.5);
        this.bg.x = this.x;
        this.bg.y = this.y;
        this.centerpos = {x: this.x, y: this.y};
        this.movepos = this.centerpos;
        this.lerpstrength = 0.001
        this.bg.zIndex = 0;
        this.addChild(this.bg);
        this.interactive = true;
        this.on("pointermove", this.pointerhover, this);
    }

    public update(framesPassed: number): void {
        this.bg.x = lerp(this.bg.x, this.movepos.x, this.lerpstrength * framesPassed);
        this.bg.y = lerp(this.bg.y, this.movepos.y, this.lerpstrength * framesPassed);
    }

    private pointerhover(e: InteractionEvent){
        let x = e.data.global.x;
        let y = e.data.global.y;
        let movey = ((y / Manager.height)*this.bg.height) - this.bg.height/2;
        let movex = ((x / Manager.width)*this.bg.width) - this.bg.width/2;
        this.movepos = {x: -movex/2, y: -movey/2};
        console.log(movex, movey)
    }

}