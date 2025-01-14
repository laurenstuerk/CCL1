import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class MoveTriggerY extends BaseGameObject {
    backGroundDiv = null;

    update = function () {
        this.backGroundDiv.style.backgroundPositionY = global.backgroundShiftY + "px";
        global.canvas.style.marginBottom = global.backgroundShiftY + "px";
    }

    draw = function () {
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    reactToCollision = function (collidingObject) {
        if (collidingObject.name == "Player") {
            let shiftByY = collidingObject.yVelocity * global.deltaTime;
            global.backgroundShiftY += shiftByY;

            if (global.backgroundShiftY < global.backgroundMaxShiftY) {
                console.log(global.backgroundMaxShiftY)
                global.backgroundShiftY = global.backgroundMaxShiftY;
                collidingObject.y = collidingObject.previousY;
                console.log(collidingObject.previousY)
            }
            else if (global.backgroundShiftY > 0) {
                console.log(global.backgroundShiftY)
                global.backgroundShiftY = 0;
                collidingObject.y = collidingObject.previousY;
            }
            else {
                global.topMoveTrigger.y += shiftByY;
                global.bottomMoveTrigger.y += shiftByY;
                global.leftMoveTrigger.y += shiftByY;
                global.rightMoveTrigger.y += shiftByY;
            }
        }

    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.backGroundDiv = document.querySelector("#background");
    }
}

export { MoveTriggerY }