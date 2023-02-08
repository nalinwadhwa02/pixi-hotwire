// import { Layer } from "@pixi/layers";
import { Sound } from "@pixi/sound";
import { Container, Sprite } from "pixi.js";
import { IScene } from "../Manager";
import { gameconstants } from "../utils/constants";
import { distBtw, getDirectionTo, getLen, Vector2 } from "../utils/Vector2";


enum PlayerStates {
    idle,
    moving,
    interacting
}

// enum SpriteStates {
//     standingleft,
//     standingright,
//     walkingleft,
//     walkingright
// }

export class Player extends Container implements IScene {
    private sprite: Sprite;
    // private spritestates: SpriteStates;
    private state: PlayerStates;
    private ToGoTo: Vector2;
    private movingsound: Sound
    constructor() {
        super();
        this.state = PlayerStates.idle;
        this.sprite = Sprite.from("ship");
        this.sprite.zIndex = 2;
        // this.spritestates = SpriteStates.standingleft;
        this.sprite.anchor.set(1, 0.5);
        this.sprite.scale.set(0.5);
        this.sprite.x = 0;
        this.sprite.y = 0;
        this.ToGoTo = {x:0, y:0};
        this.movingsound = Sound.from("./prev_assets/spaceshipmove_smaller.wav")
        this.movingsound.volume = 0.1
        this.movingsound.loop = false;
        this.addChild(this.sprite);

        // const layer = new Layer();
        // layer.useRenderTexture = true;
        // layer.useDoubleBuffer = true;
        // const trailsprite = new Sprite(layer.getRenderTexture());
        // trailsprite.alpha = 0.6;
        // layer.addChild(trailsprite);
        // this.addChild(layer);
        
    }
    public update(framesPassed: number): void {
        if (this.state == PlayerStates.moving){
            var dist = distBtw({x: this.x, y: this.y}, this.ToGoTo);
            var dirto = getDirectionTo({x: this.x, y: this.y}, this.ToGoTo);
            if( dist < 3 ){
                this.x = this.ToGoTo.x;
                this.y = this.ToGoTo.y;
                this.state = PlayerStates.idle;
                this.movingsound.stop();
            }
            else{
                // console.log("dist left:", dist , framesPassed, getLen(ToGoToDir));
                if (dirto.x < 0) {
                    this.sprite.scale.x = -0.5;
                }
                else{
                    this.sprite.scale.x = 0.5;
                }
                this.x += (dirto.x / (getLen(dirto) + 0.01)) * (framesPassed + 1) * gameconstants.CharacterMovementSpeed;
                this.y += (dirto.y / (getLen(dirto) + 0.01)) * (framesPassed + 1) * gameconstants.CharacterMovementSpeed;

            }
        }
    }
    public moveTo(location: Vector2){
        if(this.state == PlayerStates.idle || this.state == PlayerStates.moving){
            this.movingsound.play()
            // console.log("player moving to ", location)
            this.ToGoTo = location;
            this.state = PlayerStates.moving;
            // console.log("player moving to ", this.ToGoTo, this.ToGoToDir, this.state);
        }
    }

}