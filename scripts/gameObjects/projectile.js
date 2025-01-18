import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Projectile extends BaseGameObject {
    name = "Projectile";
    xVelocity = 0;
    yVelocity = 0;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "block" || collidingObject.name == "Monster") {
            collidingObject.active = false;
            this.active = false;
        }
        
    };

    update = function () {
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        // if (this.x < global.camera.x || this.x > global.camera.x + global.canvas.width || this.y < global.camera.y || this.y > global.camera.y + global.canvas.height) {
        //     this.active = false;
        // }
        
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
        this.xVelocity = (dx / magnitude) * 50;
        this.yVelocity = (dy / magnitude) * 50;
    }
}

export { Projectile }