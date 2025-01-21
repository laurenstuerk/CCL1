import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Projectile extends BaseGameObject {
    name = "Projectile";
    xVelocity = 0;
    yVelocity = 0;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Monster") {
            collidingObject.active = false;
            this.active = false;
        }
        if (collidingObject.name == "Block" || collidingObject.name == "GrasBlock") {
            this.active = false;
        }
    };

    update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        if (this.x > global.playerObject.x + 1000 || this.x < global.playerObject.x - 1000 || this.y > global.playerObject.y + 500 || this.y < global.playerObject.y - 500) {
            this.active = false; 
        }
    };





    draw = function () {
        global.ctx.fillStyle = "gold";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    constructor(x, y, width, height, targetX, targetY) {
        super(x, y, width, height);

        // Calculate direction
        const dx = targetX - x;
        const dy = targetY - y;
        const magnitude = Math.sqrt(dx * dx + dy * dy);

        // normalize and set velocity
        this.xVelocity = (dx / magnitude) * 40;
        this.yVelocity = (dy / magnitude) * 40;
        global.audio("./audio/laser-gun.mp3");
    }
}

export { Projectile }