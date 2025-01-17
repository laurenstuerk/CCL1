import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Monster extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "Monster";
    blockGravityForces = true;
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 7,
        "currentSpriteIndex": 0
    };

    reactToCollision = function (collidingObject) {

        if (collidingObject.name == "Player") {
            console.log("Player collided with Monster");
            // this.active = false;
        }d

        if (collidingObject.name == "Projectile") {
            this.active = false;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        console.log(this.animationData.firstSpriteIndex)
        console.log(this.animationData.lastSpriteIndex)

        this.loadImagesFromSpritesheet("./images/redMonster.png", 8, 1);
    }


}

export { Monster }