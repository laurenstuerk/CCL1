import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Coin extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "Coin";
    // blockGravityForces = true;
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 11,
        "currentSpriteIndex": 0
    };

    reactToCollision = function (collidingObject) {

        if (collidingObject.name == "Player") {
            console.log("Coin collected");
            this.active = false;
        }
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.loadImagesFromSpritesheet("../images/coin.png", 12, 1);
    }


}

export { Coin }