import { Sound } from "@pixi/sound";
import { Container, Graphics, InteractionEvent, Sprite } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Vector2 } from "../utils/Vector2";
import { Background } from "./Background";
import { Player } from "./Player";
import { Portal, portalpos } from "./portal";
import { UI } from "./ui";

export interface Profile {
    addr: string,
    name: string
}

export class GameScene extends Container implements IScene {
    private player: Player
    private bg: Background
    private ui: UI
    private transparentSp: Sprite
    private fo_portal: Portal
    private pp: portalpos
    // private NFTStore_portal: Portal
    // private NFTStore_pp: portalpos
    private music: Sound 
    public paused: boolean
    private GameBG: Container
    constructor(profile: Profile) {
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

        this.ui = new UI(profile.name, profile.addr);
        this.ui.zIndex = 3;
        this.addChild(this.ui);

        this.pp = {x: Manager.width - 300, y: Manager.height - 200, w: 100, h: 100, icon: "portalicon"}
        this.fo_portal = new Portal(this.pp);
        this.fo_portal.zIndex = 1;
        this.addChild(this.fo_portal);


        // this.NFTStore_pp = {x: 200, y: 400, w: 100, h: 100, icon: "portalicon"}
        // this.NFTStore_portal = new Portal(this.NFTStore_pp);
        // this.NFTStore_portal.zIndex = 1;
        // this.addChild(this.NFTStore_portal);

        this.music = Sound.from("./prev_assets/bgmusic.mp3")
        this.music.volume = 0.3
        this.music.loop = true;
        this.music.play()

        this.GameBG = new Container();
        this.GameBG.x = 0;
        this.GameBG.y = 0;
        this.GameBG.width = Manager.width;
        this.GameBG.height = Manager.height;
        this.GameBG.zIndex = 3;
        let shadedarea = new Graphics();
        shadedarea.beginFill(0x000000, 0.1);
        shadedarea.drawRect(0, 0, this.GameBG.width, this.GameBG.height);
        shadedarea.endFill();
        shadedarea.zIndex = 3;
        this.GameBG.sortableChildren = true;
        this.GameBG.addChild(shadedarea);
        this.GameBG.visible = false;
        this.addChild(this.GameBG);

        this.on("pointertap", this.pointertap, this);
        // this.on("pointermove", this.pointerhover, this);
        this.interactive = true;
        // fetch("http://localhost:9999/", {method: 'PUT', body: 'playerlogin'}).then(r => console.log(r))

    }
    public update(framesPassed: number): void {
        // console.log("frames passed in game", framesPassed);
        this.player.update(framesPassed);
        this.bg.update(framesPassed);
        this.ui.update(framesPassed);
    }
    // private pointerhover(e: InteractionEvent): void {
    // }
    private pointertap(e: InteractionEvent): void{
        if(this.paused)
            return;
        let x = e.data.global.x
        let y = e.data.global.y
        var loc: Vector2 = { x: x , y: y};
        this.player.moveTo(loc);
        if (x >= this.pp.x && x <= this.pp.x + this.pp.w && y >= this.pp.y && y <= this.pp.h + this.pp.y && ! this.paused){
            this.pause();
            // console.log("loading portal")
            let page = document.getElementById("pixi-content");
            let gameback = document.createElement("div")
            gameback.id = "game-overlay"
            let game = document.createElement("embed")
            game.id = "game-canvas"
            game.src = "./fo/fo.html"
            let closebutton = document.createElement("button")
            closebutton.id = "close-button"
            // closebutton.onclick = "console.log(closing)"
            closebutton.addEventListener("click", this.killgame.bind(this))
            closebutton.innerHTML = "&times;"
            gameback.appendChild(game);
            gameback.appendChild(closebutton)
            page?.appendChild(gameback);
            // this.GameBG.visible = true;
            // console.log(this.GameBG.visible);
            return;
        }
        return;
    }
    private killgame() {
        console.log("running close game")
        let gameback = document.getElementById("game-overlay");
        gameback?.remove();
        this.play();
    }

    public pause() {
        this.paused = true;
        this.music.pause();
    }
    public play() {
        this.paused = false;
        this.music.resume();
    }


    // public resize(screenWidth: number, screenHeight: number): void {
    // }
}