import { Container, InteractionEvent, Sprite } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Vector2 } from "../utils/Vector2";
import { Background } from "./Background";
import { Player } from "./Player";
import { Portal } from "./portal";
import { UI } from "./ui";

export class GameScene extends Container implements IScene {
    private player: Player;
    private bg: Background;
    private ui: UI;
    private transparentSp: Sprite;
    private fo_portal: Portal;
    public paused: boolean;
    constructor() {
        super();

        this.paused = false;

        this.sortableChildren = true;

        this.bg = new Background();
        this.bg.x = Manager.width / 2;
        this.bg.y = Manager.height/2;
        this.bg.zIndex = 0;
        this.addChild(this.bg);

        this.player = new Player();
        this.player.x = Manager.width / 2;
        this.player.y = Manager.height / 2;
        this.player.zIndex = 2;
        this.addChild(this.player);

        this.transparentSp = Sprite.from("trs");
        if (this.transparentSp) {}

        this.ui = new UI("player", "walletaddress");
        this.ui.zIndex = 3;
        this.addChild(this.ui);

        this.fo_portal = new Portal();
        this.fo_portal.zIndex = 1;
        this.addChild(this.fo_portal);

        this.on("pointertap", this.pointertap, this);
        // this.on("pointermove", this.pointerhover, this);
        this.interactive = true;

    }
    public update(framesPassed: number): void {
        // console.log("frames passed in game", framesPassed);
        if (!this.paused){
            this.player.update(framesPassed);
        }
        this.bg.update(framesPassed);
        this.ui.update(framesPassed);
    }
    // private pointerhover(e: InteractionEvent): void {
    // }
    private pointertap(e: InteractionEvent): void{
        var loc: Vector2 = { x: e.data.global.x , y: e.data.global.y };
        this.player.moveTo(loc);
    }

    public pause() {
        this.paused = true;
    }
    public play() {
        this.paused = false;
    }


    // public resize(screenWidth: number, screenHeight: number): void {
    // }
}