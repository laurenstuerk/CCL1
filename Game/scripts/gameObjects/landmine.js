import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Landmine extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "Landmine";

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
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