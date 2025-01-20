import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class DefenseTower extends BaseGameObject {
    xVelocity = 0;
    yVelocity = 0;
    name = "DefenseTower";
    blockGravityForces = true;


    reactToCollision = function (collidingObject) {


    }
    draw = function () {
        global.ctx.fillStyle = "black";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        // this.loadImagesFromSpritesheet("./images/redMonster.png", 8, 1);
    }
}

export { DefenseTower }