import { Container, Graphics } from "pixi.js";
import { IScene } from "../Manager";

export class Portal extends Container implements IScene {
    private portalbox: Graphics;
    constructor () {
        super();

        this.x = 1200;
        this.y = 600;

        this.portalbox = new Graphics();
        this.portalbox.beginFill(0x6666bb);
        this.portalbox.drawRoundedRect(-50, -50, 100, 100, 20);
        this.portalbox.interactive = true;
        this.portalbox.cursor = "pointer";
        this.portalbox.on("pointerdown", this.onClick);
        this.addChild(this.portalbox);

    }
    public update(framesPassed: number): void {
        if(framesPassed) {}
    }
    public onClick() {
        console.log("portal linked")
    }
}