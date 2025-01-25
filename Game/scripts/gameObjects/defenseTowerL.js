import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";
import { enemyProjectile } from "./enemyProjectile.js";

class DefenseTowerL extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "DefenseTowerL";
    blockGravityForces = true;
    shootTimer = 0;

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.0555,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 13,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.shootTimer += global.deltaTime;

        if (this.shootTimer >= 1) { // Every 1 second
            this.shoot();
            this.shootTimer = 0; // Reset timer
        }
    }

    shoot() {
        new enemyProjectile(this.x + this.width / 2, this.y + 30, 30, 10, -1, global.playerObject.y);
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/gunTowerL.png", 14, 1);
    }
}

export { DefenseTowerL }