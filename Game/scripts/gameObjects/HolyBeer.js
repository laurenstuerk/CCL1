import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class HolyBeer extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "HolyBeer";
    // blockGravityForces = true;
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.5,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 19,
        "currentSpriteIndex": 0
    };

    reactToCollision = function (collidingObject) {

        if (collidingObject.name == "Player") {
            console.log("Player collided with HolyBeer");
            this.active = false;
            global.playerObject.holyBeerCount += 1;
            global.playerObject.physicsData.maxJumps = 2
        }
    }
  
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.loadImagesFromSpritesheet("./images/HolyBeer.png", 20, 1);
    }
}

export { HolyBeer }