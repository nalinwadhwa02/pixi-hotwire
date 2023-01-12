import { Container, Graphics } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { GameScene, Profile } from "./GameScene";

declare global {
    interface Window extends KeplrWindow {}
}

export class ConnectWalletScene extends Container implements IScene {
    private startbutton: Graphics
    constructor () {
        super();
        this.startbutton = new Graphics();
        this.startbutton.beginFill(0xFFFFFFF);
        this.startbutton.drawPolygon([-2, 2, -2, -2, 2, 0])
        this.startbutton.endFill();
        this.startbutton.scale.set(10);
        this.startbutton.x = Manager.width/2;
        this.startbutton.y = Manager.height/2;
        this.startbutton.interactive = true;
        this.startbutton.cursor = "pointer";
        this.startbutton.on("pointertap", this.onStart.bind(this))
        this.addChild(this.startbutton);

        let page = document.getElementById("pixi-content");
        let textinput = document.createElement("input")
        textinput.id = "playername-textbox"
        textinput.autocapitalize = "off"
        textinput.autocomplete = "off"
        textinput.spellcheck = false
        textinput.autofocus = true
        textinput.placeholder = "Enter name"
        // textinput.addEventListener("keypress", this.onStart.bind(this));
        page?.appendChild(textinput);
    }

    private onStart(): void {
        this.ConnectToWallet().then(result =>  this.moveScene(result));
    }

    private moveScene(result : Profile | Error){
        console.log(result);
        if (result instanceof Error){
            alert("You need to install Keplr Wallet Extension to access this site")
        }
        else{
            let textinput = document.getElementById("playername-textbox");
            textinput?.remove();
            Manager.changeScene(new GameScene(result));
        }

    }
    // exit
    

    public update(framesPassed: number): void {
        if (framesPassed) {}
    }
    private async ConnectToWallet() : Promise<Profile | Error> {
        if (!window.keplr){
            return Error("keplr not found");
        }
        else{
            const oflfineSigner = window.getOfflineSigner!("uni-5");
            // const stclient = await StargateClient.connect("https://rpc.uni.juno.deuslabs.fi:443")
            const acocunt = (await oflfineSigner.getAccounts())[0].address
            const name = (<HTMLInputElement>document.getElementById("playername-textbox")).value;

            return { addr : acocunt, name: name }
        }

    }
}