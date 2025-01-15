import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Blocker extends BaseGameObject {
    name = "Blocker";
    xVelocity = 0;
    yVelocity = 0;


    blockGravityForces = true;

    reactToCollision = function (collidingObject){
        // console.log(collidingObject.previousX);
        // console.log(collidingObject.previousY);
        if (collidingObject.name == "Player") {
            console.log("Block collided with Player");
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }



    draw = function() {
        // global.ctx.fillStyle = "black";
        // global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);  
        // this.loadImages(["./images/stone.png"]);      
    }
}

export {Blocker}