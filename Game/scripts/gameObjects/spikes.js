import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Spike extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "Spike";

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            console.log("Player collided with Monster");
            global.gameOver = true;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/spike.png"]); 
    }
}

export { Spike }