import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Projectile extends BaseGameObject {
    name = "Projectile";
    xVelocity = 0;
    yVelocity = 0;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "block" || collidingObject.name == "Enemy") {
            collidingObject.active = false;
        }
    };

    update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        // if (this.x < 0 || this.x > global.canvas.width ||
        //     this.y < 0 || this.y > global.canvas.height) {
        //     this.destroy();
        //     console.log("Projectile destroyed");
        // }
    };





    draw = function () {
        global.ctx.fillStyle = "black";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    constructor(x, y, width, height, targetX, targetY) {
        super(x, y, width, height);

        // Calculate direction
        const dx = targetX - x;
        const dy = targetY - y;
        const magnitude = Math.sqrt(dx * dx + dy * dy);

        // normalize and set velocity
        this.xVelocity = (dx / magnitude) * 50;
        this.yVelocity = (dy / magnitude) * 50;
    }
}

export { Projectile }