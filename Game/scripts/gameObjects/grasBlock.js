import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class GrasBlock extends BaseGameObject {
    name = "GrasBlock";
    xVelocity = 0;
    yVelocity = 0;


    blockGravityForces = true;

    reactToCollision = function (collidingObject){
        if (collidingObject.name == "Player") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }
    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y + 25,
            bottom: this.y + this.height
        }
        return bounds;
    };


    // draw = function() {
    //     global.ctx.fillStyle = "black";
    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };

    constructor(x, y, width, height) {
        super(x, y, width, height);  
        this.loadImages(["./images/rGras.png"]);      
    }
}

export {GrasBlock}