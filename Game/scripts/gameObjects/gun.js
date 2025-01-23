import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Gun extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "Gun";


    reactToCollision = function (collidingObject) {

        if (collidingObject.name == "Player") {
            this.active = false;
            global.playerObject.canShoot = true;
            new global.audio("./audio/gunUnlocked.mp3");
        }
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/gun.png"]);
        console.log("Gun created");  
    }
}

export { Gun }