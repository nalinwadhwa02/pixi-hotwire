import { Container, Graphics, Sprite, Text, TextStyle} from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Vector2 } from "../utils/Vector2";

export class UI extends Container implements IScene {
    private addr: Text
    private playername: Text
    private ProfileSprite: Sprite
    private boxes: Container;
    constructor (name: string, address: string ) {
        super();

        this.sortableChildren = true;

        this.ProfileSprite = Sprite.from("ship");
        this.ProfileSprite.anchor.set(0.5);
        this.ProfileSprite.scale.set(0.5);
        this.addChild(this.ProfileSprite);

        this.boxes = new Container();
        this.addChild(this.boxes);

        const style = new TextStyle({
            fontFamily : "Comic Sans MS",
            align: "right",
            fill: 0xffffff,
            fontSize: 20,
        })
        this.addr = new Text(address.substring(0,10) + "...", style);
        this.addChild(this.addr);
        this.playername = new Text(name, style);
        this.addChild(this.playername);


        this.repositionUI({x:Manager.width, y:Manager.height});

    }
    private repositionUI(screens: Vector2) {

        let width = screens.x;
        let height = screens.y;
        
        let uix = this.x + width - ((width/ 100) * 5);
        let uiy = this.y + ((height/ 100) * 10);

        this.ProfileSprite.x = uix
        this.ProfileSprite.y = uiy
        this.ProfileSprite.zIndex = 5

        this.boxes.removeChildren();
        this.boxes.sortableChildren = true;

        let obj = new Graphics();
        obj.beginFill(0x8888dd);
        obj.drawCircle(uix, uiy, 50);
        obj.zIndex = 2;
        this.boxes.addChild(obj);

        let obj2 = new Graphics();
        obj2.beginFill(0x6666bb);
        obj2.drawCircle(uix, uiy, 60);
        obj2.zIndex = 1;
        this.boxes.addChild(obj2);

        let obj3 = new Graphics();
        obj3.beginFill(0x6666bb);
        obj3.drawRoundedRect(uix - 190, uiy - 30, 200, 60, 10);
        obj3.zIndex = 1
        this.boxes.addChild(obj3);

        this.addr.x = uix - 180
        this.addr.y = uiy - 3

        this.playername.x = uix - 180
        this.playername.y = uiy - 30



    }
    public update(framesPassed: number): void {
        if(framesPassed) {}
    }
}