import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTrigger extends BaseGameObject {
    backGroundDiv = null;

    update = function () {
        this.backGroundDiv.style.backgroundPositionX = global.backgroundShiftX + "px";
        global.canvas.style.marginLeft = global.backgroundShiftX + "px";
    }

    draw = function () {
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            let shiftByX = collidingObject.xVelocity * global.deltaTime;
            global.backgroundShiftX += shiftByX * -1;

            if (global.backgroundShiftX < global.backgroundMaxShiftX) {
                global.backgroundShiftX = global.backgroundMaxShiftX;
                collidingObject.x = collidingObject.previousX;
            }
            else if (global.backgroundShiftX > 0) {
                global.backgroundShiftX = 0;
                collidingObject.x = collidingObject.previousX;
            }
            else {
                global.leftMoveTrigger.x += shiftByX;
                global.rightMoveTrigger.x += shiftByX;
                // global.topMoveTrigger.x += shiftByX;
                // global.bottomMoveTrigger.x += shiftByX;
            }

        }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export { MoveTrigger }