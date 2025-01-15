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



    // draw = function() {
    //     global.ctx.fillStyle = "black";
    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };

    constructor(x, y, width, height) {
        super(x, y, width, height);  
        this.loadImages(["./images/gras.png"]);      
    }
}

export {GrasBlock}