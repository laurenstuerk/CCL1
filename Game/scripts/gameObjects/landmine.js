import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Landmine extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "Landmine";
    shootTimer = 0;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.0555,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            console.log("Player collided with Mine");
            global.audio("./audio/russian_explosion.mp3");
            global.gameOver = true;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/landmine.png", 1, 1);
    }
}

export { Landmine }