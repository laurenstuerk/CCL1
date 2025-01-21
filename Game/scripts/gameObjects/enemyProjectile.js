import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class enemyProjectile extends BaseGameObject {
    name = "enemyProjectile";
    xVelocity = 0;
    yVelocity = 0;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            global.gameOver = true;
        }
        if (collidingObject.name == "Block" || collidingObject.name == "GrasBlock") {
            this.active = false;
        }
    };

    update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

    };





    draw = function () {
        global.ctx.fillStyle = "red";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    constructor(x, y, width, height, targetX, targetY) {
        super(x, y, width, height);
        this.xVelocity = 5 * targetX;
        this.yVelocity = 0;
    }
}

export { enemyProjectile }