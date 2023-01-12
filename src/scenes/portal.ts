import { Container, Graphics, Sprite } from "pixi.js";
import { IScene } from "../Manager";

export interface portalpos {
    x: number,
    y: number,
    w: number,
    h: number
}

export class Portal extends Container implements IScene {
    private portalbox: Graphics;
    private portalicon: Sprite;
    constructor (pp: portalpos) {
        super();

        this.x = 0;
        this.y = 0;
        this.sortableChildren = true;

        this.portalbox = new Graphics();
        this.portalbox.beginFill(0x6666bb);
        this.portalbox.drawRoundedRect(pp.x, pp.y, pp.w, pp.h, 20);
        this.portalbox.zIndex = 1;
        this.portalicon = Sprite.from("portalicon");
        this.portalicon.x = pp.x ;
        this.portalicon.y = pp.y ;
        this.portalicon.width = pp.w ;
        this.portalicon.height = pp.h ;
        this.portalicon.zIndex = 2;
        this.addChild(this.portalicon);
        this.addChild(this.portalbox);

    }
    public update(framesPassed: number): void {
        if(framesPassed) {}
    }
}