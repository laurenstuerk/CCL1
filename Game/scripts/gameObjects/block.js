import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Block extends BaseGameObject {
    name = "Block";
    xVelocity = 0;
    yVelocity = 0;


    blockGravityForces = true;

    reactToCollision = function (collidingObject){
        if (collidingObject.name == "Player") {
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }



    // draw = function() {
    //     global.ctx.fillStyle = "black";
    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };

    constructor(x, y, width, height) {
        super(x, y, width, height);  
        this.loadImages(["./images/rStone.png"]);      
    }
}

export {Block}