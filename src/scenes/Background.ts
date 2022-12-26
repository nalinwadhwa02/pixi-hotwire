import { Container, Sprite } from "pixi.js";
import { IScene } from "../Manager";
import { gameconstants } from "../utils/constants";

export class Background extends Container implements IScene {
    private bg: Sprite;
    constructor() {
        super();
        this.bg = Sprite.from("bg");
        this.bg.anchor.set(0.5);
        this.bg.x = this.x;
        this.bg.y = this.y;
        this.bg.scale.set(2.2);
        this.bg.zIndex = 0;
        this.addChild(this.bg);
    }

    public update(framesPassed: number): void {
        this.x -= framesPassed * gameconstants.BackgroundPaneSpeed;
    }
}